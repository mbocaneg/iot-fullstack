#include "ISensor.h"
#include <Wire.h>
#include "Adafruit_HTU21DF.h"

Adafruit_HTU21DF htu = Adafruit_HTU21DF();
bool running = htu.begin();

class htu21df_temp: public ISensor {
public:
  htu21df_temp(): ISensor(3, "htu21df_temp", "F", "sensor that reads temperature"){
  }

  virtual void init_sensor(){
    if(!running){
      if (!htu.begin()) {
        Serial.println("Couldn't find sensor!");
        while (1);
      }
      running = true;
    }
  }

  float read_sensor(){
    float temp = (htu.readTemperature() * 9.0/5.0) + 32.0;
    return temp;
  }
};

class htu21df_hum: public ISensor {
public:
  htu21df_hum(): ISensor(4, "htu21df_hum", "%%", "sensor that reads humidity"){
  }

  virtual void init_sensor(){
    if(!running){
      if (!htu.begin()) {
        Serial.println("Couldn't find sensor!");
        while (1);
      }
      running = true;
    }
  }

  float read_sensor(){
    float humidity = htu.readHumidity();
    return humidity;
  }
};
