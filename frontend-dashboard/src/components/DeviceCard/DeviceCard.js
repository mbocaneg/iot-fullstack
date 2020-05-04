import React from 'react';
import './DeviceCard.scss'
// import '../../assets/card.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";


export default function DeviceCard(props) {
    let device = props.device;
    return (
        <div className="device-card">
            <p className="device-card-subheader" >device id: {device.dev_id}</p>

            <div className="device-card-header">
                <p className="device-card-header-text">{device.dev_name}</p>
                <FontAwesomeIcon className="device-card-header-icon" icon={faMicrochip} />
            </div>


            <p className="device-card-text">{device.dev_desc}</p>
            <p className="device-card-support-text">location: {device.dev_location}</p>

        </div>
    );
};