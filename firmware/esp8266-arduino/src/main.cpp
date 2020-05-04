#include <Arduino.h>
#include <Wire.h>
#include "Adafruit_HTU21DF.h"

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "htu21df.h"

#define SECONDS(X) 1000 * X
#define MINUTES(X) 60000  * X
#define HOURS(X) MINUTES(60) * X

#define DEVICE_ID 2;

const char* ssid = "MY_SSID";
const char* password = "MYPASS123";

const char* endpoint = "http://0.0.0.0/readings";

htu21df_temp htu_temp;
htu21df_hum htu_hum;
ISensor *onboard_sensors[2];

void setup() {
  Serial.begin(9600);

  onboard_sensors[0] = &htu_temp;
  onboard_sensors[1] = &htu_hum;

  for(int i = 0; i < sizeof(onboard_sensors)/sizeof(onboard_sensors[0]); i++){
    onboard_sensors[i]->init_sensor();
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print("Connecting..");
  }

}

void postSensorReadings(const char *endpoint, ISensor &sensor){
  // Serial.println("Sensor name: ");
  // Serial.println(sensor.name);
  //
  // Serial.println("Sensor value: ");
  // Serial.println(sensor.read_sensor());
  //
  // Serial.println("units: ");
  // Serial.println(sensor.units);

  StaticJsonDocument<300> doc;
  doc["sensorId"] = sensor.id;
  doc["name"] = sensor.name;
  doc["value"] = sensor.read_sensor();
  doc["units"] = sensor.units;
  doc["devId"] = DEVICE_ID;

  char JSONmessageBuffer[300];
  serializeJsonPretty(doc, JSONmessageBuffer);

  HTTPClient http;
  http.begin(endpoint);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(JSONmessageBuffer);
  String payload = http.getString();

  http.end();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {

    for(int i = 0; i < sizeof(onboard_sensors)/sizeof(onboard_sensors[0]); i++){
      postSensorReadings(endpoint, *onboard_sensors[i]);
    }

    delay(3000);
  }

}
