 import React, { useState } from 'react';
import axios from 'axios';
import { getAqiDetails } from '../data/constants';
import '../App.css';

const API_BASE = "https://aqi-bput.ionode.cloud/api/data";

const StationTable = ({ stations, selectedStationId, onSelect, onAddStation }) => {
  const [showForm, setShowForm] = useState(false);
  const [newStation, setNewStation] = useState({
    name: '',
    pm25: '',
    temp: '',
    lat: '',
    lng: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newStation.name || !newStation.lat || !newStation.lng) {
      alert('Please fill all required fields.');
      return;
    }

    const stationId = `stn-${Date.now()}`;

    // Construct new station data for UI only
    const addedStation = {
      id: stationId,
      station: newStation.name,
      pm25: parseFloat(newStation.pm25) || 0,
      temp: parseFloat(newStation.temp) || 0,
      lat: parseFloat(newStation.lat),
      lng: parseFloat(newStation.lng),
      pm10: parseFloat(newStation.pm25) || 0,
      co2: 400,
      no2: 20,
      o3: 10,
      hum: 50,
      pm1: parseFloat(newStation.pm25) || 0,
      o2: 21,
      co: 1
    };

    // Add station locally without API call
    onAddStation(addedStation);

    setNewStation({ name: '', pm25: '', temp: '', lat: '', lng: '' });
    setShowForm(false);
  };

  return (
    <div className="table-panel">
      <div className="panel-header">
        <h2 className="panel-title">Station Overview</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>+</button>
      </div>

      <div className="station-table-wrapper">
        <table className="station-table">
          <thead>
            <tr>
              <th>Station Name</th>
              <th>PM2.5</th>
              <th>Temp</th>
              <th>Temprature Status</th>
            </tr>
          </thead>
          <tbody>
            {stations.length > 0 ? stations.map(s => (
              <tr
                key={s._id || s.id}
                className={`table-row ${s._id === selectedStationId || s.id === selectedStationId ? 'selected-row' : ''}`}
                onClick={() => onSelect(s._id || s.id)}
              >
                <th className="table-row-header">{s.station || s.name}</th>
                <td className="table-pm25">{(s.pm25 || 0).toFixed(0)}</td>
                <td>{(s.temp || 0).toFixed(1)}°C</td>
                <td>
                  <span className={`aqi-pill ${getAqiDetails(s.temp || 0).colorClass}`}>
                    {getAqiDetails(s.temp || 0).status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>No stations available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Station</h3>
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Station Name" value={newStation.name} onChange={handleInputChange} required />
              <input name="pm25" type="number" placeholder="PM2.5" value={newStation.pm25} onChange={handleInputChange} />
              <input name="temp" type="number" placeholder="Temperature" value={newStation.temp} onChange={handleInputChange} />
              <input name="lat" type="number" step="0.0001" placeholder="Latitude" value={newStation.lat} onChange={handleInputChange} required />
              <input name="lng" type="number" step="0.0001" placeholder="Longitude" value={newStation.lng} onChange={handleInputChange} required />

              <div style={{ marginTop: 10 }}>
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: 10 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationTable;
