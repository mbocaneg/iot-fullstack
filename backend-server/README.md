# iot-backend
Backend server that serves as the backbone for this whole project. It hosts a REST api written with Express.js and Typescript. This api communicates with an SQlite3 database that preserves IOT metadata.

# Installation
Install the required dependencies:
```
npm install
```
To build this project, run the command
```
npm run build
```
which transpiles Typescript sources down to Javascript.

Finally, to start the server run
```
npm run start
```
This starts the server on port 5000

# Usage
There are 3 main endpoints that users and devices may wish to interact with. 

## /devices
This route holds a registry of the embedded devices present in this system. Running a GET request on this returns a JSON list of all registered devices. A device object is structured in the following manner:
```
{
    "dev_id": $int, // Device ID
    "dev_name": $string, // Device Name
    "dev_arch": $string, // Architecture/Chipset of the embedded device
    "dev_os": $string, // OS/Firmware of the device
    "dev_location": $string, // Physical location device is at
    "dev_desc": $string // Short description of the device
}
```
To retrieve a single device, query the devices endpoint as follows
```
/devices/${device_id}
```

## /sensors
This route holds a registry of the sensors present in this system. Running a GET request on this endpoint returns a JSON list of all registered sensors. A sensor object is structured in the following manner:
```
{
    "sensor_id": $int, // Sensor ID
    "sensor_name": $string, // Sensor Name
    "sensor_units": $string, // Sensor Units
    "sensor_desc": $string, // Short description of sensor
    "dev_id": $int, // ID of Device this sensor is connected to
    "sensor_pv": $float // Present value this sensor holds
}
```
To retrieve a single sensor, query the sensors endpoint as follows
```
/sensors/${sensor_id}
```

## /readings
This route holds a log of historical sensor data. One may fetch sensor data from this endpoint through a GET request, and an embedded device may submit sensor data to it using a POST request with a JSON payload.

A reading JSON object is structured in the following form:
```
{
    "id": $int, // ID of this reading
    "ts": $int, // UNIX epoch timestamp at which this reading took place
    "sensor_id": $int, // ID of sensor that submitted this reading
    "dev_id": $int, // ID of device which the sensor is onboard
    "val": $float, // value of the reading
    "units":"F" // units of reading
}
```

To retrieve/submit a single reading, one may use the ```sensor_id``` url parameter as such
```
/readings/${sensor_id}
```

