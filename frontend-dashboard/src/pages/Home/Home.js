import React from 'react';
import { useState, useEffect } from 'react';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { apiUri, epochToDateTime_mdYHs } from '../../assets/Utils';


import './Home.scss'

export default function Home() {

    let [recentReadings, setRecentReadings] = useState([]);
    const [deviceCount, setDeviceCount] = useState(0);
    const [sensorCount, setSensorCount] = useState(0);

    useEffect(() => {
        let baseUri = apiUri + 'readings?order=desc&limit=30';
        fetch(baseUri)
            .then(res => res.json())
            .then(response => {
                setRecentReadings(response);
            })

    }, []);

    useEffect(() => {
        let baseUri = apiUri + 'sensors/count';
        fetch(baseUri)
            .then(res => res.json())
            .then(response => {
                setSensorCount(response.sensor_count);
            })

    }, []);

    useEffect(() => {
        let baseUri = apiUri + 'devices/count';
        fetch(baseUri)
            .then(res => res.json())
            .then(response => {
                setDeviceCount(response.device_count);
            })

    }, []);

    return (
        <div className="home-page">
            <div className="header">
                <h1 className="header-lettering">Home</h1>
            </div>

            {/* <p className="title">System Status:</p> */}

            <div className="home-summary">
                <Link key={'devices-link'} style={{ color: 'black', textDecoration: 'none' }} to={{ pathname: `/devices` }}>
                    <div className="summary-widget">
                        <FontAwesomeIcon className="summary-icon" icon={faMicrochip} />
                        <div className="summary-details">
                            <p className="summary-property">Devices</p>
                            <p className="summary-value">{deviceCount}</p>
                        </div>
                    </div>
                </Link>


                <Link key={'devices-link'} style={{ color: 'black', textDecoration: 'none' }} to={{ pathname: `/sensors` }}>
                    <div className="summary-widget">
                        <FontAwesomeIcon className="summary-icon" icon={faProjectDiagram} />
                        <div className="summary-details">
                            <p className="summary-property">Sensors</p>
                            <p className="summary-value">{sensorCount}</p>
                        </div>
                    </div>
                </Link>

            </div>

            <div>
                <p className="title">Recent Measurements</p>
                <div className="recent-readings-table" >
                    <table style={{width: "80vw"}}>
                        <tbody>
                            <tr className="table-header" style={{position: "sticky", top: "0", zIndex: "1"}}>
                                <td className="table-identifier">Timestamp</td>
                                <td className="table-identifier">Sensor ID</td>
                                <td className="table-identifier">Value</td>
                                <td className="table-identifier">Units</td>
                            </tr>
                            {recentReadings.map((reading, index) =>
                                <tr>
                                    <td className="table-val">{epochToDateTime_mdYHs(reading.ts)}</td>
                                    <td className="table-val">{reading.sensor_id}</td>
                                    <td className="table-val">{reading.val}</td>
                                    <td className="table-val">{reading.units}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );

}