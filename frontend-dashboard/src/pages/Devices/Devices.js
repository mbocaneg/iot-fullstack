import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./Devices.scss";

import "../../components/DeviceCard/DeviceCard";
import DeviceCard from '../../components/DeviceCard/DeviceCard';

import { apiUri } from '../../assets/Utils';



export default function Devices(props) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    let baseUri = apiUri + 'devices/';
    console.log('fetching device list');
    fetch(baseUri)
      .then(res => res.json())
      .then(response => {
        setDevices(response);
        console.log(response);
      })

  }, []);

  return (
    <div className="device-container">
      <div className="header">
        <h1 className="header-lettering">Devices</h1>
      </div>

        <div className="device-grid">

          {
            devices.map((item, index) =>
              <Link key={index + item} style={{ color: 'black', textDecoration: 'none' }} to={{ pathname: `devices/${item.dev_id}`, state: { device: item } }}>
                <DeviceCard device={item} />
              </Link>
            )

          }

        </div>

    </div>

  );

};