export class Device {
    constructor(
        public id:number,
        public name:string,
        public arch:string,
        public os:string,
        public location:string,
        public desc:string){}
};

export class Sensor {
    constructor(
        public id:number,
        public name:string,
        public units:string,
        public desc:string,
        public deviceId:number){}
};

export class Reading {
    constructor(
        public timestamp:number,
        public sensorId:number,
        public deviceId:number,
        public value:number
    ){}
};
export class ReadingShort{
    constructor(
        public timestamp:number,
        public value:number
    ){}
};
