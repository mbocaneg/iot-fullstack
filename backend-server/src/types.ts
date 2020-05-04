import { Reading, ReadingShort, Device, Sensor} from './Models';

export const enum AvgRange {
  All, Daily, Weekly, Monthly,
}

export interface IDBAdapter {

    addReading(reading:Reading): void;
    getReadings(period:string, order:string, limit:string, start:number, end:number):Promise<Reading[]>;


    getReadingsByDeviceId(devId:number):Promise<Reading[]>;
    getReadingsBySensorId(sensorId:number, period:string, order:string, limit:string, start:number, end:number):Promise<ReadingShort[]>;

    addDevice(device:Device):Promise<number>;
    getDevices():Promise<Device[]>;
    getDeviceCount():Promise<number>;
    getDeviceById(deviceId:number):Promise<Device>;

    addSensor(sensor:Sensor):void;
    getSensors():Promise<Sensor[]>;
    getSensorCount():Promise<number>;
    getSensorById(sensorId:number):Promise<Sensor>;
    getSensorsByDeviceId(sensorId:number):Promise<Sensor[]>;
};
