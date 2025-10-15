import React, { useState } from 'react';
import { getAqiDetails } from '../data/constants';
import '../App.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newStation.name || !newStation.lat || !newStation.lng) return;
    onAddStation({
      id: `stn-${Date.now()}`,
      name: newStation.name,
      pm25: parseFloat(newStation.pm25) || 0,
      temp: parseFloat(newStation.temp) || 0,
      lat: parseFloat(newStation.lat),
      lng: parseFloat(newStation.lng),
    });
    setNewStation({ name: '', pm25: '', temp: '', lat: '', lng: '' });
    setShowForm(false);
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
            {stations.map(s => (
              <tr
                key={s.id}
                className={`table-row ${s.id === selectedStationId ? 'selected-row' : ''}`}
                onClick={() => onSelect(s.id)}
              >
                <th className="table-row-header">{s.name}</th>
                <td className="table-pm25">{s.pm25.toFixed(0)}</td>
                <td>{s.temp.toFixed(1)}°C</td>
                <td>
                  <span className={`aqi-pill ${getAqiDetails(s.pm25).colorClass}`}>
                    {getAqiDetails(s.pm25).status}
                  </span>
                </td>
              </tr>
            ))}
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
