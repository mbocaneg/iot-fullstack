import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./Readings.scss"

import { apiUri, epochToDateTime_mdYHs } from '../../assets/Utils';
import Loading from '../../components/Loading/Loading';

export default function Readings(props) {

  let [readings, setReadings] = useState([]);

  useEffect(() => {
    let baseUri = apiUri + 'readings?order=desc';
    fetch(baseUri)
      .then(res => res.json())
      .then(response => {
        setReadings(response);
      })

  }, []);

  return (
    <div>
      <div className="header">
        <h1 className="header-lettering">Readings</h1>
      </div>

      {readings.length > 0 ? (
        <div className="all-readings-table">
          <table style={{width: "90vw"}}>
            <tbody>
              <tr className="table-header">
                <td className="table-identifier">Timestamp</td>
                <td className="table-identifier">Sensor ID</td>
                <td className="table-identifier">Value</td>
                <td className="table-identifier">Units</td>
              </tr>
              {readings.map((reading, index) =>
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

      )
        :
        <Loading />
      }

    </div>
  );
}