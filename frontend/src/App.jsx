import React, { useState, useRef } from 'react';
import { STATION_DATA, generateMockTimeSeries, COLOR_PRIMARY, COLOR_BACKGROUND } from './data/constants';
import MetricCard from './components/MetricCard';
import Map from './components/MapComponent';
import StationTable from './components/StationTable';
import StationLineChart from './components/LineChart';
import { Globe, Download, MapPin, Search, Cloud, Zap, Thermometer, Droplet, Wind } from 'lucide-react';
import './App.css';

const App = () => {
 const [stations, setStations] = useState(STATION_DATA);
const [selectedStationId, setSelectedStationId] = useState(STATION_DATA[0]?.id || null); 

const selectedStation = stations.find(s => s.id === selectedStationId) || stations[0] || {};


  const handleAddStation = (newStation) => {
    setStations(prev => [...prev, newStation]);
  };

  const mapElementId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`);
  const [timeSeriesData] = useState(generateMockTimeSeries());
  const [isLeafletReady] = useState(true);
  const handleStationSelect = (id) => setSelectedStationId(id);

  const handleDownload = () => {
    const jsonString = JSON.stringify({ timestamp: new Date().toISOString(), current_station_data: STATION_DATA, time_series_pm25: timeSeriesData }, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'air_quality_dashboard_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container">
      <header className="header-bar">
        <h1 className="main-title"><Wind size={32} /> Air Quality Monitor</h1>
        <button onClick={handleDownload} className="download-btn"><Download size={20} /> Download Data</button>
      </header>

      <div className="metrics-section">
        <div className="metrics-grid">
          <MetricCard title="PM2.5" value={selectedStation.pm25} unit="µg/m³" icon={Cloud} colorClass="aq-card-bg" aqiStatus={true} />
          <MetricCard title="PM10" value={selectedStation.pm10} unit="µg/m³" icon={Cloud} colorClass="aq-card-bg" aqiStatus={true} />
          <MetricCard title="CO₂" value={selectedStation.co2} unit="ppm" icon={Zap} colorClass="aq-card-bg" />
          <MetricCard title="NO₂" value={selectedStation.no2} unit="ppb" icon={Zap} colorClass="aq-card-bg" />
          <MetricCard title="O₃" value={selectedStation.o3} unit="ppb" icon={Zap} colorClass="aq-card-bg" />
        </div>
        <div className="metrics-grid">
          <MetricCard title="Temperature" value={selectedStation.temp} unit="°C" icon={Thermometer} colorClass="env-card-bg" />
          <MetricCard title="Humidity" value={selectedStation.humidity} unit="%" icon={Droplet} colorClass="env-card-bg" />
          <MetricCard title=" pm1" value={selectedStation.pm1} unit="µg/m³" icon={Cloud} colorClass="env-card-bg" />
          <MetricCard title="O₂" value={selectedStation.o2} unit="%" icon={Zap} colorClass="env-card-bg" />
          <MetricCard title="CO" value={selectedStation.co} unit="ppm" icon={Zap} colorClass="env-card-bg" />
        </div>
      </div>
      <h2 className="panel-title"><MapPin size={20} /> Monitoring Station Map</h2>
      <div className="app-container">
        <div className="map-container">
        <Map
          stations={stations}
          selectedStationId={selectedStationId}
          onSelectStation={setSelectedStationId}
        />
      </div>
      
      <div className="table-container">
        <StationTable
          stations={stations}
          selectedStationId={selectedStationId}
          onSelect={setSelectedStationId}
          onAddStation={handleAddStation}
        />
      </div>
    </div>

      <div className="chart-panel">
        <h2 className="chart-title">24-Hour PM2.5 Trends (Station Comparison)</h2>
        <StationLineChart data={timeSeriesData} selectedStationId={selectedStationId} />
      </div>
    </div>
  );
};

export default App;
