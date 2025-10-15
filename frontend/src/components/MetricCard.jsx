import React from 'react';
import { getAqiDetails } from '../data/constants';
import '../App.css';
const MetricCard = ({ title, value, unit, icon: Icon, colorClass, aqiStatus = null }) => {
    const { colorClass: aqiColorClass, status } = aqiStatus ? getAqiDetails(value) : { colorClass: '', status: '' };
    return (
        <div className={`metric-card ${colorClass} text-white`}>
            <div className="card-top">
                <Icon size={24} style={{ opacity: 0.8 }} />
                <span className="card-value">{value.toFixed(aqiStatus ? 0 : 1)}</span>
            </div>
            <div>
                <div className="card-label">{title} {unit && `(${unit})`}</div>
                {aqiStatus && <div className={`aqi-pill ${aqiColorClass}`}>{status}</div>}
            </div>
        </div>
    );
};

export default MetricCard;
