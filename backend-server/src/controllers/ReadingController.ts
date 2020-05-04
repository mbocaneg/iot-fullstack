import {Request, Response, Router} from 'express';
import { Reading} from "../Models";
import {AvgRange } from "../types";
import { read } from 'fs';

// curl --header "Content-Type: application/json" --request POST --data '{"sensorId":1,"devId":1, "value":777}' http://localhost:5000/readings


class ReadingController {
    router:Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    };

    addReading = (req:Request, res:Response):void => {
        const db = req.app.locals.db;
        let reading:Reading = new Reading(Date.now(), req.body.sensorId, req.body.devId, req.body.value);
        db.addReading(reading);
        res.status(201).send(`reading added successfully`);
    };

    getReadings = async (req:Request, res:Response) => {
        const db = req.app.locals.db;
        let period = req.query.period;

        let order = req.query.order;
        let limit = req.query.limit;

        let start = req.query.start;
        let end = req.query.end;

        let reading:Reading[] = await db.getReadings(period, order, limit, start, end);
        res.status(200).json(reading);
    }

    getReadingsBySensorId = async(req:Request, res:Response) => {
        const db = req.app.locals.db;
        let sensor_id:number = Number(req.params.sensorId);

        let period = req.query.period;

        let order = req.query.order;
        let limit = req.query.limit;

        let start = req.query.start;
        let end = req.query.end;

        let readings:Reading[] = await db.getReadingsBySensorId(sensor_id, period, order, limit, start, end);
        res.status(200).json(readings);

    }

    getReadingsByDeviceId = async(req:Request, res:Response) => {
        console.log("reading controller: fetching readings by device_id");
        const db = req.app.locals.db;
        let dev_id:number = Number(req.params.devId);

        let readings:Reading[] = await db.getReadingsByDeviceId(dev_id);
        res.status(200).json(readings);
    }

    setupRoutes = () => {
        this.router.get('/', this.getReadings);
        // this.router.post('/', this.addReading);

        this.router.get('/sensor/:sensorId', this.getReadingsBySensorId);
        this.router.get('/device/:devId', this.getReadingsByDeviceId);
    }
};

const controller:ReadingController = new ReadingController();
const ReadingRouter:Router = controller.router;
export default ReadingRouter;
