import React, { useState } from 'react';
import axios from 'axios';
import { getAqiDetails } from '../data/constants';
import '../App.css';

const API_BASE = "https://aqi-bput.ionode.cloud";

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

    // Generate unique ID for new station
    const stationId = `stn-${Date.now()}`;

    // Construct GET request URL
    const url = `${API_BASE}/${stationId}?pm2_5=${newStation.pm25 || 0}&pm10=${newStation.pm25 || 0}&co2=400&no2=20&o3=10&temp=${newStation.temp || 0}&hum=50&pm1=${newStation.pm25 || 0}&o2=21&co=1`;

    try {
      await axios.get(url);

      // Add station locally
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

      onAddStation(addedStation);
      setNewStation({ name: '', pm25: '', temp: '', lat: '', lng: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add station:', err);
      alert('Error adding station. Try again.');
    }
  };

  return (
    <div className="table-panel">
      <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
              <th>AQI Status</th>
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
                  <span className={`aqi-pill ${getAqiDetails(s.pm25 || 0).colorClass}`}>
                    {getAqiDetails(s.pm25 || 0).status}
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

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Station</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={newStation.name} onChange={handleInputChange} required />
              </label>
              <label>
                PM2.5:
                <input type="number" name="pm25" value={newStation.pm25} onChange={handleInputChange} />
              </label>
              <label>
                Temp (°C):
                <input type="number" name="temp" value={newStation.temp} onChange={handleInputChange} />
              </label>
              <label>
                Latitude:
                <input type="number" step="0.0001" name="lat" value={newStation.lat} onChange={handleInputChange} required />
              </label>
              <label>
                Longitude:
                <input type="number" step="0.0001" name="lng" value={newStation.lng} onChange={handleInputChange} required />
              </label>
              <div style={{ marginTop: '10px' }}>
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '10px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationTable;
