import React from 'react';
import './Loading.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loading(props) {
    return (
        <div className="loading-page">
            <div className="loading">
                <p className="loading-message-header">Fetching Data..</p>
                <p className="loading-message-subheader">Please Wait...</p>
                <FontAwesomeIcon className="loading-icon" icon={faSpinner} spin size="lg" />
            </div>
        </div>
    );
};