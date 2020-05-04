import {Device, Sensor, Reading, ReadingShort} from '../Models';
import {IDBAdapter, AvgRange} from '../types';
import {sqlite3, Database} from 'sqlite3';
import { response } from 'express';

export class AdapterSqlite3 implements IDBAdapter{

    dbName:string;

    constructor(dbName:string){
        this.dbName = dbName;
    };

    addReading = (reading:Reading): void => {
        let ts:number = Date.now();
        let db:Database = new Database(this.dbName);

        db.run('INSERT INTO Readings (ts, sensor_id, dev_id, val) VALUES (?,?,?,?)',
            [ts, reading.sensorId, reading.deviceId, reading.value],
            (err)=> {
                if(err){
                    // console.log("error inserting into readings");
                }
            }
        );
        db.close()
    };

    getReadings(period:string, order:string, limit:string, start:number, end:number):Promise<Reading[]>{
        let db:Database = new Database(this.dbName);
        let readings:Reading[] = [];
        let query = '';

        let _order = order? order: ' asc ';
        let _limit = limit? ' limit ' + limit + ' ': '';

        let rangeQuery = ''
        if(start && end) {
          rangeQuery = ' ts between ' + start + ' and ' + end + ' ';
        }
        else if(start){
          rangeQuery = ' ts > ' + start + ' ';
        }
        else if(end){
          rangeQuery = ' ts < ' + end + ' ';
        }

        switch (period) {
          case "daily":
            query =
                `select ts, round(avg(val), 2) as val, sensor_id, units from Readings
                where strftime('%H-%M-%S', datetime( ts, 'unixepoch', 'localtime' ))
                between '00:00:00' AND '24:00:00' ` +  (rangeQuery?(' and '+rangeQuery ): '')  +
                ` group by strftime('%Y-%m-%d', datetime( ts, 'unixepoch', 'localtime' )), sensor_id;`;
            break;
          case "weekly":
            query =
                `select ts, round(avg(val), 2) as val, sensor_id, units from Readings `
                + ( (rangeQuery)?('where ' + rangeQuery): '' ) +`
                group by strftime('%W', datetime( ts, 'unixepoch', 'localtime' )), sensor_id
                order by ts` + (_order || ` asc `) + _limit;
            break;
          case "monthly":
            query =
                `select ts, round(avg(val), 2) as val, sensor_id, units from Readings `
                + ( (rangeQuery)?('where ' + rangeQuery): '' ) +
                ` group by strftime('%M', datetime( ts, 'unixepoch', 'localtime' )), sensor_id
                order by ts ` + (_order || ' asc ') + _limit;
            break;
          case "hourly":
            query = 'SELECT * FROM Readings ' + ( (rangeQuery)?('where ' + rangeQuery): '' ) +
            ' ORDER BY ts ' + (_order || ' asc ') + _limit;
            break;
          default:
            query = 'SELECT * FROM Readings ' + ( (rangeQuery)?('where ' + rangeQuery): '' ) +
            ' ORDER BY ts ' + (_order || ' asc ') + _limit;
            break;
        }

        return new Promise(resolve=>{
            db.all(query, [], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    readings.push(row);
                });
                db.close();
                resolve(readings);
            });
        });
    };

    getReadingsByDeviceId = async(devId:number):Promise<Reading[]> => {
        let db:Database = new Database(this.dbName);
        let readings:Reading[] = [];

        return new Promise(resolve=>{
            db.all('SELECT * FROM Readings WHERE dev_id = ?', [devId], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    readings.push(row);
                });
                db.close();
                resolve(readings);
            });
        });

    }

    getReadingsBySensorId = async(sensorId:number, period:string, order:string, limit:string, start:number, end:number):Promise<ReadingShort[]> => {
        let db:Database = new Database(this.dbName);
        let readings:Reading[] = [];
        let query = 'SELECT ts, val FROM Readings WHERE sensor_id = ?';

        let _order = order? order: ' asc ';
        let _limit = limit? ' limit ' + limit + ' ': '';

        let rangeQuery = ''
        if(start && end) {
          rangeQuery = ' ts between ' + start + ' and ' + end + ' ';
        }
        else if(start){
          rangeQuery = ' ts > ' + start + ' ';
        }
        else if(end){
          rangeQuery = ' ts < ' + end + ' ';
        }

        switch (period) {
          case "daily":
            query =
                `select ts, round(avg(val), 2) as val, sensor_id, units from Readings
                where sensor_id=? and strftime('%H-%M-%S', datetime( ts, 'unixepoch', 'localtime' ))
                between '00:00:00' AND '24:00:00' ` + (rangeQuery? (' and ' + rangeQuery): '') +
                ` group by strftime('%Y-%m-%d', datetime( ts, 'unixepoch', 'localtime' ))
                order by ts ` + (_order || ` asc `) + _limit ;
            break;
          case "weekly":
            query =
                `select ts, round(avg(val), 2) as val, sensor_id, units from Readings
                where sensor_id=? `  + (rangeQuery? (' and ' + rangeQuery): '') +
                ` group by strftime('%W', datetime( ts, 'unixepoch', 'localtime' )), sensor_id
                order by ts ` + (_order || ` asc `) + _limit;
            break;
          case "monthly":
            query =
                `select ts, round(avg(val), 2) as val, sensor_id, units from Readings
                where sensor_id=? `  + (rangeQuery? (' and ' + rangeQuery): '') +
                ` group by strftime('%M', datetime( ts, 'unixepoch', 'localtime' )), sensor_id
                order by ts ` + (_order || ` asc `) + _limit;
            break;
          case "hourly":
            query =
                'SELECT ts, val, units FROM Readings WHERE sensor_id = ? '
                + (rangeQuery? (' and ' + rangeQuery): '') +
                ' order by ts ' + (_order || ` asc `) + _limit;
            break;
          default:
            query =
                'SELECT ts, val, units FROM Readings WHERE sensor_id = ? '
                + (rangeQuery? (' and ' + rangeQuery): '') +
                ' order by ts ' + (_order || ` asc `) + _limit;
            break;
        }

        return new Promise(resolve=>{
            db.all(query, [sensorId], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    readings.push(row);
                });
                db.close();
                resolve(readings);
            });
        });
    }

    addDevice = (device:Device):Promise<number> => {
        let db:Database = new Database(this.dbName);
        let readings:Reading[] = [];

        return new Promise(resolve=>{
            db.run('INSERT INTO Devices (dev_name, dev_arch, dev_os, dev_location, dev_desc) VALUES (?,?,?,?,?)',[device.name, device.arch, device.os, device.location, device.desc], function(err){
                if(err){
                    console.log("error inserting into Devices");
                }
                db.close();
                // console.log("Inserted with id: " + this.lastID);
                resolve(this.lastID);
            });
        });
    }

    getDeviceCount = async():Promise<number> => {
      let db:Database = new Database(this.dbName);
      let deviceNum:number[] = [];

      return new Promise(resolve=>{
          db.all('SELECT COUNT(*) as device_count FROM Devices', [], (err, rows) => {
              if(err){
                  // return console.error(err.message);
              }
              rows.forEach((row)=>{
                  deviceNum.push(row);
              });
              db.close();
              resolve(deviceNum[0]);
          });
      });
    }
    getDevices = async():Promise<Device[]> => {
        let db:Database = new Database(this.dbName);
        let devices:Device[] = [];

        return new Promise(resolve=>{
            db.all('SELECT * FROM Devices', [], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    devices.push(row);
                });
                db.close();
                resolve(devices);
            });
        });
    }
    getDeviceById = async(deviceId:number):Promise<Device> => {
        let db:Database = new Database(this.dbName);
        let devices:Device[] = [];

        return new Promise(resolve=>{
            db.all('SELECT * FROM Devices WHERE dev_id = ?', [deviceId], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    devices.push(row);
                });
                db.close();
                resolve(devices[0]);
            });
        });

    }


    addSensor = (sensor:Sensor):void => {

    }
    getSensorCount = async():Promise<number> => {
      let db:Database = new Database(this.dbName);
      let sensorNum:number[] = [];

      return new Promise(resolve=>{
          db.all('SELECT COUNT(*) as sensor_count FROM Sensors', [], (err, rows) => {
              if(err){
                  // return console.error(err.message);
              }
              rows.forEach((row)=>{
                  sensorNum.push(row);
              });
              db.close();
              resolve(sensorNum[0]);
          });
      });
    }
    getSensors = async():Promise<Sensor[]> => {
        let db:Database = new Database(this.dbName);
        let sensors:Sensor[] = [];

        return new Promise(resolve=>{
            db.all('SELECT * FROM Sensors', [], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    sensors.push(row);
                });
                db.close();
                resolve(sensors);
            });
        });
    }
    getSensorById = async(sensorId:number):Promise<Sensor> => {
        let db:Database = new Database(this.dbName);
        let sensors:Sensor[] = [];

        return new Promise(resolve=>{
            db.all('SELECT * FROM Sensors WHERE sensor_id = ?', [sensorId], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    sensors.push(row);
                });
                db.close();
                resolve(sensors[0]);
            });
        });
    }
    getSensorsByDeviceId = async(deviceId:number):Promise<Sensor[]> => {
        let db:Database = new Database(this.dbName);
        let sensors:Sensor[] = [];

        return new Promise(resolve=>{
            db.all('SELECT * FROM Sensors WHERE dev_id = ?', [deviceId], (err, rows) => {
                if(err){
                    // return console.error(err.message);
                }
                rows.forEach((row)=>{
                    sensors.push(row);
                });
                db.close();
                resolve(sensors);
            });
        });
    }
};
