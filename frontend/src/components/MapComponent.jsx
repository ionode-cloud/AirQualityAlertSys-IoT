import React from 'react';
import '../App.css';

const MapComponent = ({ stations, selectedStationId }) => {
  // Use _id from MongoDB if available, fallback to id
  const selectedStation = stations.find(
    s => s._id === selectedStationId || s.id === selectedStationId
  );

  if (!selectedStation) return <p>No station selected</p>;

  const { lat, lng, name } = selectedStation;

  return (
    <div className="map-embed-container">
      <iframe
        title={`Map of ${name}`}
        height="500px"
        width="100%"
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>

      {/* Optional blinking marker overlay */}
      <div className="map-blink-marker" />
    </div>
  );
};

export default MapComponent;
