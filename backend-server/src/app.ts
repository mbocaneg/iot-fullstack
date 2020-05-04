import express, {Application} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

import {IDBAdapter} from './types';
import {AdapterSqlite3} from './db_adapters/AdapterSqlite3';

import DeviceRouter from './controllers/DeviceController';
import SensorRouter from './controllers/SensorController';
import ReadingRouter from './controllers/ReadingController';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db:IDBAdapter = new AdapterSqlite3('iot.db');
app.locals.db = db;

app.use(cors());

app.use('/sensors', SensorRouter);
app.use('/devices', DeviceRouter);
app.use('/readings', ReadingRouter);

app.use('/', (req, res) => {
  res.json({status: 'OK'});
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server running");
});
