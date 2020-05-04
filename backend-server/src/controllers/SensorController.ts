import {Request, Response, Router} from 'express';
import { Sensor } from "../Models";


class SensorController {
    router:Router;
    constructor() {
        this.router = Router();
        this.setupRoutes();
    };

    getSensorById = async(req:Request, res:Response)=> {
        const db = req.app.locals.db;

        let sensor_id:string = req.params.sensorId;
        let sensor:Sensor = await db.getSensorById(Number(sensor_id));
        res.status(200).json(sensor);
    }

    getSensorsByDeviceId = async(req:Request, res:Response)=> {
        const db = req.app.locals.db;

        let device_id:string = req.params.deviceId;
        let sensors:Sensor[] = await db.getSensorsByDeviceId(Number(device_id));
        res.status(200).json(sensors);
    }

    getSensors = async(req:Request, res:Response) => {
        const db = req.app.locals.db;
        let sensors = await db.getSensors();
        res.status(200).json(sensors);
    }

    getSensorCount = async(req:Request, res:Response) => {
        const db = req.app.locals.db;
        let sensorCount = await db.getSensorCount();
        res.status(200).json(sensorCount);
    }

    setupRoutes = () => {
        this.router.get('/count', this.getSensorCount);
        this.router.get('/', this.getSensors);
        this.router.get('/:sensorId', this.getSensorById);
        this.router.get('/deviceId/:deviceId', this.getSensorsByDeviceId);
    }
};

const controller = new SensorController();
const SensorRouter = controller.router;
export default SensorRouter;
