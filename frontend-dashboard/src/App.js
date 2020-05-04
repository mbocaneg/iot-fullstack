import React from 'react';
import "./App.scss"

import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from 'react';



import Sidenav from './components/Sidenav/Sidenav'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import Devices from './pages/Devices/Devices';
import DevicesDetails from './pages/Devices/DeviceDetails/DeviceDetails';
import Sensors from './pages/Sensors/Sensors';
import SensorDetails from './pages/Sensors/SensorDetails/SensorDetails';
import Readings from './pages/Readings/Readings';
import Home from './pages/Home/Home'

import Loading from './components/Loading/Loading';

import { apiUri } from './assets/Utils';

function App() {

  let links = [
    { text: "Home", route: "/home", icon: <FontAwesomeIcon icon={faHome} /> },
    { text: "Devices", route: "/devices", icon: <FontAwesomeIcon icon={faMicrochip} /> },
    { text: "Sensors", route: "/sensors", icon: <FontAwesomeIcon icon={faProjectDiagram} /> },
    { text: "Readings", route: "/readings", icon: <FontAwesomeIcon icon={faChartLine} /> },
  ];

  const [response, setResponse] = useState('');
  useEffect(() => {
    fetch(apiUri)
      .then(res => res.json())
      .then(response => {
        console.log('status: ' + response.status);
        setResponse(response.status);
      })

  }, []);

  return (


    <div className="App">

      {response === 'OK' ? (
        <>
          <Sidenav links={links} />
          <Switch>
            <Route path="/sensors/:slug" component={SensorDetails}></Route>
            <Route path="/sensors/" component={Sensors}></Route>

            <Route path="/readings" component={Readings}></Route>
            <Route path="/devices/:slug" component={DevicesDetails}></Route>
            <Route path="/devices" component={Devices}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </>

      ) :
        <Loading />
      }


    </div>
  );

}

export default App;
