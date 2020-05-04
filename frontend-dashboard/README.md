# iot-dash
This directory holds React based Dashboard that displays and visualizes IOT data. It communicates with the included backend server.

# Installation
To use this dashboard, first install the dependencies:
```
npm install
```

As this project was created with ```create-react-app```, it may be run using the following
command
```
npm start
```
Make sure that the backend server is running whilst running this dashboard.

To create a production build, run
```
npm run build
```
which creates an optimized build in the build/ directory.

# Usage
The dashboard consists of 4 main views

## Home
The Home page serves as a way to obtain a quick summary of the system. It lists the number of
devices connected to the server, the number of sensors connected to those devices, and a table
that lists the last 30 readings which the server has logged.

## Devices
The Devices page holds a grid of cards that represent an individual device connected to the system. These cards list off the device's name, id, description and description. Clicking on 
one of these devices brings up a Device Details page which lists of all of the metadata associated with that device, along with the sensors that the device holds.

## Sensors
Similar to the Devices view, the Sensors page holds a grid of sensor cards that represent all the sensors present in the system. These cards list off a sensor's id, name, description, and most importantly, the present value that the sensor holds. Clicking on one of these cards brings up a Sensor analytics page which displays graphs and tables that visualize past readings this sensor has logged.

## Readings
The Readings page simply holds a large table that encompasses all readings that the backend holds.