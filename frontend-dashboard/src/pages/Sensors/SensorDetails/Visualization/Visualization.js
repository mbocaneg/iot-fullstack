import React from 'react';
import { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';
import { apiUri, epochToDateTime_mdY } from '../../../../assets/Utils';

import './Visualization.scss';
import Loading from '../../../../components/Loading/Loading';

export default function Visualization(props) {

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

    useEffect(() => {
        let baseUri = apiUri + 'readings/sensor/' + props.sensor_id + '?period=' + props.period;
        console.log("baeURI: " + baseUri);
        fetch(baseUri)
            .then(res => res.json())
            .then(response => {
                setReadingLabels(response.map((reading) => epochToDateTime_mdY(reading.ts)));
                setReadingValues(response.map((reading) => reading.val));
            })
    }, []);

    return (
        <div className="visualization-content">
            {readingLabels.length > 0? (
                <>
                <div className="visualization-line-chart" >
                <Line
                    data={chart_data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: props.period + " readings (" + props.units + ")",
                            fontSize: 24,
                            fontFamily: 'Ubuntu',
                            fontStyle: 200,
                            fontColor: "rgb(145, 145, 145)"
                        },
                        legend: {
                            display: false
                        }
                    }}
                />
            </div>

            <div className="visualization-table">
                <table>
                    <tbody>
                        <tr className="table-header" style={{position: "sticky", top: "0", zIndex: "1"}}>
                            <td className="table-identifier">Timestamp</td>
                            <td className="table-identifier">Value({props.units})</td>
                        </tr>

                        {readingLabels.map((label, index) =>
                            <tr>
                                <td className="table-val">{(label)}</td>
                                <td className="table-val">{readingValues[index]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </>
            ) : (
                <Loading />
            )}

            



        </div>
    );
};