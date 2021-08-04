import React from 'react';
import './stats.css';

export const Stats = ({ oldest, averageAge, youngest }) => {

    return (
        <div className="stats">
            <h3>Oldest User: {oldest}</h3>
            <h3>Average Age: {averageAge}</h3>
            <h3>Youngest User: {youngest}</h3>
        </div>
    )
}

export default Stats;
