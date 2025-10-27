import React from "react";
import { getAqiDetails } from "../data/constants";
import "../App.css";

const MetricCard = ({ title, value, unit, icon: Icon, colorClass, temp = false }) => {
  // Ensure value is always a number
  const numericValue = typeof value === "number" && !isNaN(value) ? value : 0;

  // Calculate AQI details only if requested
  const { colorClass: aqiColorClass, status } = temp ? getAqiDetails(numericValue) : { colorClass: "", status: "" };

  return (
    <div className={`metric-card ${colorClass} text-white`}>
      <div className="card-top">
        <Icon size={24} style={{ opacity: 0.8 }} />
        <span className="card-value">{numericValue.toFixed(temp ? 0 : 1)}</span>
      </div>
      <div>
        <div className="card-label">{title}{unit && ` (${unit})`}</div>
        {temp && <div className={`aqi-pill ${aqiColorClass}`}>{status}</div>}
      </div>
    </div>
  );
};

export default MetricCard;
