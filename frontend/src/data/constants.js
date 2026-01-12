export const COLOR_PRIMARY = "#10b981";
export const COLOR_SECONDARY = "#3b82f6";
export const COLOR_BACKGROUND = "#1f2937";
export const COLOR_TEXT_LIGHT = "#e5e7eb";

<<<<<<< HEAD
// Global dynamic station store
export let STATION_DATA = [];

export const setStationData = (stations) => {
  STATION_DATA = stations.map((s) => ({
    id: s._id || s.id || `stn-${Date.now()}`,
    name: s.station || "Unknown Station",
    lat: s.lat || 20.2961,
    lng: s.lng || 85.8245,
    
    co2: s.co2 ?? 0,
    co: s.co ?? 0,
    o2: s.o2 ?? 0,
    no2: s.no2 ?? 0,
    o3: s.o3 ?? 0,
    temp: s.temp ?? 0,
    humidity: s.hum ?? 0,
    pm25: s.pm2_5 ?? 0,
    pm10: s.pm10 ?? 0,
    pm1: s.pm1 ?? 0,

    aqi: s.pm2_5 ?? 0,
  }));
};

// Realistic time-series
export const generateMockTimeSeries = () => {
  const data = [];
  const hours = [...Array(24).keys()];
  const stationIds = STATION_DATA.map((s) => s.id);

  hours.forEach((h) => {
    const entry = { time: `${h}:00` };
    stationIds.forEach((id, i) => {
      const base = STATION_DATA[i].pm25;
      entry[id] = base + Math.round(Math.random() * 20 - 10);
=======
/* ===================== STATION STORAGE ===================== */
export let STATION_DATA = [];

/* Save stations globally for charts or reuse */
export const setStationData = (stations = []) => {
  STATION_DATA = stations.map((s) => ({
    _id: s._id || s.id || `stn-${Date.now()}`,
    station: s.station || s.name || "Unknown Station",
    pm25: s.pm25 || 0,
    pm10: s.pm10 || 0,
    co2: s.co2 || 0,
    co: s.co || 0,
    no2: s.no2 || 0,
    o3: s.o3 || 0,
    temp: s.temp || 0,
    hum: s.hum || 0,
    pm1: s.pm1 || 0,
    o2: s.o2 || 0,
    lat: s.lat || 0,
    lng: s.lng || 0,
  }));
};

/* ===================== Generate PM2.5 time series ===================== */
export const generateMockTimeSeries = (stations = STATION_DATA) => {
  if (!stations.length) return [];

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const data = [];

  hours.forEach((h) => {
    const entry = { time: `${h}:00` };

    stations.forEach((station) => {
      const id = station._id || station.id;
      const base = station.pm25 || 20;
      const variation =
        Math.sin((h / 24) * Math.PI * 2) * base * 0.4 +
        (Math.random() * 10 - 5);

      entry[id] = Math.max(5, Math.round(base + variation));
>>>>>>> 3e6c65a (testing localluy the project)
    });

    data.push(entry);
  });

  return data;
  
};
<<<<<<< HEAD
// src/data/constants.js


export const getAqiDetails = (value) => {
  if (value <= 0) return { colorClass: "freezing", status: "Freezing" };
  if (value <= 15) return { colorClass: "cold", status: "Cold" };
  if (value <= 25) return { colorClass: "pleasant", status: "Pleasant" };
  if (value <= 32) return { colorClass: "Good ", status: "Good " };
  if (value <= 40) return { colorClass: "hot", status: "Hot" };
  return { colorClass: "extreme", status: "Extreme Heat" };
};
=======

/* ===================== AQI status helper ===================== */
export const getAqiDetails = (pm25) => {
  if (pm25 <= 12) return { colorClass: "bg-green-600", status: "Good" };
  if (pm25 <= 35) return { colorClass: "bg-yellow-600", status: "Moderate" };
  if (pm25 <= 55) return { colorClass: "bg-orange-600", status: "Unhealthy (SG)" };
  if (pm25 <= 150) return { colorClass: "bg-red-600", status: "Unhealthy" };
  return { colorClass: "bg-purple-600", status: "Very Unhealthy" };
};
>>>>>>> 3e6c65a (testing localluy the project)
