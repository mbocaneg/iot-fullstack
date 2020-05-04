import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import './Sidenav.scss';

export default function Sidenav(props) {

    const [navOpen, setNavOpen] = useState(false);
    const [highlightedLink, setHighlightedLink] = useState(-1);

    let displace_width = (props.displace) ? '216px' : '48px';
    let location = useLocation();

    let darken_page =
        <div
            onClick={() => setNavOpen(false)}
            className="darken-page"
            style={{ width: navOpen === true ? '100vw' : '0px' }}>
        </div>


    useEffect(() => {
        let current_root_path = '/' + location.pathname.split('/')[1];

        for(let i=0;i<props.links.length;i++){
            if(props.links[i].route === current_root_path){
                setHighlightedLink(i);
                break;
            } 
        }

    }, [location]);

    return (
        <div className="container">
            <div className="spacer" style={{ width: navOpen === true ? displace_width : '48px' }}></div>
            <div className="sidenav" style={{ left: navOpen === true ? '0' : '-168px' }}>

                <ul>
                    <div className="close-icon">
                        <FontAwesomeIcon
                            onClick={() => setNavOpen(!navOpen)}
                            style={{ color: '' }}
                            className="menu-icon"
                            icon={!navOpen ? faBars : faWindowClose} />
                    </div>

                    {props.links.map((link, index) =>
                        <li className={highlightedLink === index? 'selected-link': ''}
                            onClick={()=>setHighlightedLink(index)}
                        >
                            <Link to={link.route}>
                                <p>{link.text}</p>
                                {link.icon}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>

            {props.displace ? null : darken_page}

        </div>
    );
};