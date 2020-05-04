import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { Line } from 'react-chartjs-2';
import { apiUri, epochToDateTime_mdY } from '../../../assets/Utils';

import Visualization from '../SensorDetails/Visualization/Visualization';

import './SensorDetails.scss';

export default function SensorDetails(props) {
  let { slug } = useParams();
  let [sensor, setSensor] = useState({});

  let [readingLabels, setReadingLabels] = useState([]);
  let [readingValues, setReadingValues] = useState([]);

  const chart_data = {
    labels: readingLabels,
    datasets: [
      {
        label: 'Readings',
        fill: false,
        lineTension: 0.25,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: readingValues
      }
    ]
  }

  // let apiUri = "http://localhost:5000/";
  // let apiUri = "http://10.0.0.94:5000/";

  useEffect(() => {
    let baseUri = apiUri + 'sensors/' + slug;
    fetch(baseUri)
      .then(res => res.json())
      .then(response => {
        setSensor(response);
      })

  }, []);

  useEffect(() => {
    let baseUri = apiUri + 'readings/sensor/' + slug + '?period=weekly';
    fetch(baseUri)
      .then(res => res.json())
      .then(response => {
        setReadingLabels(response.map((reading) => (reading.ts)));
        setReadingValues(response.map((reading) => reading.val));
      })
  }, []);

  return (

    <div className="sensor-details-page">
      <div className="header">
        <h1 className="header-lettering">Sensor: {sensor.sensor_name}</h1>
      </div>
      <div className="data">
        <Visualization period="weekly" sensor_id={slug} units={sensor.sensor_units}/>
        <Visualization period="daily" sensor_id={slug} units={sensor.sensor_units}/>
        {/* <Visualization period="hourly" sensor_id={slug}/> */}
      </div>

    </div>


  );
};