import {Device} from '../Models';
import {Request, Response, Router} from 'express';

// curl --header "Content-Type: application/json" --request POST --data '{"devName":"Test", "devArch":"x86", "devOs":"Linux", "devLoc":"NULL", "devDesc":"test insertion"}' http://localhost:5000/devices

class DeviceController {
    public router:Router;

    constructor(){
        this.router = Router();
        this.setupRoutes();
    }

    getDeviceById = async(req:Request, res:Response) => {
        const db = req.app.locals.db;

        let dev_id:string = req.params.devId;
        let dev:Device = await db.getDeviceById(Number(dev_id));
        res.status(200).json(dev);
    }

    getDevices = async(req:Request, res:Response) => {
        const db = req.app.locals.db;
        let devs = await db.getDevices();
        res.status(200).json(devs);
    }

    getDeviceCount = async(req:Request, res:Response) => {
        const db = req.app.locals.db;
        let deviceCount = await db.getDeviceCount();
        res.status(200).json(deviceCount);
    }

    setupRoutes = () => {
      this.router.get('/count', this.getDeviceCount);
        this.router.get('/', this.getDevices);
        this.router.get('/:devId', this.getDeviceById);
    }
};

const controller = new DeviceController();
const DeviceRouter:Router = controller.router;

export default DeviceRouter;
