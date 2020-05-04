import React from 'react';
import './SensorCard.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";

export default function SensorCard(props) {
    let sensor = props.sensor;
    return (
        <div className="sensor-card">
            <FontAwesomeIcon className="sensor-icon" icon={faProjectDiagram} />

            <p className="sensor-id">sensor id: {sensor.sensor_id}</p>

            <p className="sensor-name">{sensor.sensor_name}</p>

            <div className="sensor-data">
                <p className="sensor-value">{sensor.sensor_pv || "00.00" }</p>
                <p className="sensor-units"> &nbsp;{sensor.sensor_units}</p>
            </div>
 
            <p className="sensor-description">{sensor.sensor_desc}</p>
        </div>
    );
};
