import React, { useState, useEffect } from "react";
import MetricCard from "./components/MetricCard";
import MapComponent from "./components/MapComponent";
import StationTable from "./components/StationTable";
import StationLineChart from "./components/LineChart";
import { setStationData, generateMockTimeSeries } from "./data/constants";
import {
  Download,
  MapPin,
  Cloud,
  Zap,
  Thermometer,
  Droplet,
  Wind
} from "lucide-react";
import "./App.css";

const API_BASE = "https://aqi-bput.ionode.cloud/api/data";

const App = () => {
  const [stations, setStations] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [chartData, setChartData] = useState([]);

  // Fetch API data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_BASE);
        const data = await res.json();

        setStations(data);
        setStationData(data);
        setChartData(generateMockTimeSeries());

        if (data.length > 0) setSelectedStationId(data[0].id || data[0]._id);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, []);

  const selected =
    stations.find((s) => (s._id || s.id) === selectedStationId) || {};

  // Add new station from StationTable
  const handleAddStation = (newStation) => {
    const updatedStations = [...stations, newStation];
    setStations(updatedStations);
    setStationData(updatedStations);
    setChartData(generateMockTimeSeries());
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(stations, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "air_quality_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container">
      <header className="header-bar">
        <h1 className="main-title">
          <Wind size={32} /> Air Quality Monitor
        </h1>
        <button onClick={downloadJSON} className="download-btn">
          <Download size={20} /> Download
        </button>
      </header>

      {/* Metrics */}
      <div className="metrics-section">
        <div className="metrics-grid">
          <MetricCard title="PM2.5" value={selected.pm25} icon={Cloud} aqiStatus />
          <MetricCard title="PM10" value={selected.pm10} icon={Cloud} />
          <MetricCard title="CO₂" value={selected.co2} icon={Zap} />
          <MetricCard title="NO₂" value={selected.no2} icon={Zap} />
          <MetricCard title="O₃" value={selected.o3} icon={Zap} />
        </div>

        <div className="metrics-grid">
          <MetricCard title="Temp" value={selected.temp} unit="°C" icon={Thermometer} />
          <MetricCard title="Humidity" value={selected.humidity} unit="%" icon={Droplet} />
          <MetricCard title="PM1" value={selected.pm1} icon={Cloud} />
          <MetricCard title="O₂" value={selected.o2} icon={Zap} />
          <MetricCard title="CO" value={selected.co} icon={Zap} />
        </div>
      </div>

      {/* Station Map & Table */}
      <h2 className="panel-title">
        <MapPin size={22} /> Monitoring Stations
      </h2>

      <div className="app-container">
        <div className="map-container">
          <MapComponent
            stations={stations}
            selectedStationId={selectedStationId}
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

      {/* Chart */}
      <div className="chart-panel">
        <h2 className="chart-title">24-hour PM2.5 Trend</h2>
        <StationLineChart
          data={chartData}
          stations={stations}
          selectedStationId={selectedStationId}
        />
      </div>
    </div>
  );
};

export default App;
