import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

import { apiUri } from '../../../assets/Utils';

import SensorCard from '../../../components/SensorCard/SensorCard';

import "./DeviceDetails.scss"

export default function DeviceDetails(props) {
    let { slug } = useParams();
    let data = useLocation();

    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        let baseUri = apiUri + 'sensors/deviceId/' + slug;
        fetch(baseUri)
            .then(res => res.json())
            .then(response => {
                setSensors(response);

            })
    }, []);

    return (
        <div className="details">
            <div className="header">
                <h1 className="header-lettering">Device: {data.state.device.dev_name}</h1>
            </div>

            <div className="properties-list">
            <h1 className="title-lettering">Details</h1>

                <table>
                    <tbody>
                    <tr>
                        <td className="table-identifier">ID:</td>
                        <td className="table-val">{data.state.device.dev_id}</td>
                    </tr>
                    <tr>
                        <td className="table-identifier">Arch:</td>
                        <td className="table-val">{data.state.device.dev_arch}</td>
                    </tr>
                    <tr>
                        <td className="table-identifier">OS:</td>
                        <td className="table-val">{data.state.device.dev_os}</td>
                    </tr>
                    <tr>
                        <td className="table-identifier">Location:</td>
                        <td className="table-val">{data.state.device.dev_location}</td>
                    </tr>
                    <tr>
                        <td className="table-identifier">Description:</td>
                        <td className="table-val">{data.state.device.dev_desc}</td>
                    </tr>
                    </tbody>
                </table>
            </div>


            <div className="sensors">
            <h1 className="title-lettering">Attached Sensors </h1>

                <div className="sensors-list">
                    {sensors.length > 0 ?
                        (sensors.map(((item, index) =>
                            <div className="sensor" key={item + index}>
                                <Link key={index + item} style={{ color: 'black', textDecoration: 'none' }} to={{ pathname: `/sensors/${item.sensor_id}`, state: { sensor: item } }}>
                                    <SensorCard sensor={item} />
                                </Link>
                            </div>)))
                        :
                        <p className="sensor-null">No sensors found.</p>
                    }
                </div>
            </div>

        </div>
    );
};