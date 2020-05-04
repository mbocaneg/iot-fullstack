import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Sensors.scss"

import '../../components/SensorCard/SensorCard';
import SensorCard from '../../components/SensorCard/SensorCard';
import { apiUri } from '../../assets/Utils';


export default function Sensors(props) {

    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        let baseUri = apiUri + 'sensors/';
        console.log('fetching sensors list');
        fetch(baseUri)
            .then(res => res.json())
            .then(response => {
                setSensors(response);
            })

    }, []);

    return (
        <div className>
            <div className="header">
                <h1 className="header-lettering">Sensors</h1>
            </div>
            <div className="sensors-content">
                {sensors.map((item, index) =>
                    <div className="sensor-item">
                        <Link key={index + item} style={{ color: 'black', textDecoration: 'none' }} to={{ pathname: `sensors/${item.sensor_id}`, state: { sensor: item } }}>
                            <SensorCard sensor={item} />
                        </Link>
                        
                    </div>
                )}
            </div>
        </div>
    );
}