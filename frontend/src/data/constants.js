export const COLOR_PRIMARY = "#10b981";
export const COLOR_SECONDARY = "#3b82f6";
export const COLOR_BACKGROUND = "#1f2937";
export const COLOR_TEXT_LIGHT = "#e5e7eb";

// Dynamic station data
export let STATION_DATA = [];

export const setStationData = (stations) => {
  STATION_DATA = stations.map((s) => ({
    id: s._id || s.id || `stn-${Date.now()}`,
    name: s.station || s.name || "Unknown Station",
    lat: s.lat || 0,
    lng: s.lng || 0,
    aqi: s.pm25 || 0,
    pm25: s.pm25 || 0,
    pm10: s.pm10 || s.pm25 || 0,
    co: s.co || 0,
    co2: s.co2 || 0,
    o3: s.o3 || 0,
    no2: s.no2 || 0,
    o2: s.o2 || 0,
    temp: s.temp || 0,
    humidity: s.hum || 0,
    pm1: s.pm1 || 0,
  }));
};

export const generateMockTimeSeries = () => {
  const data = [];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const stations = STATION_DATA.map((s) => s.id);

  hours.forEach((h) => {
    const entry = { time: `${h}:00` };
    stations.forEach((id, index) => {
      const baseValue = STATION_DATA[index].pm25;
      const fluctuation = Math.sin((h / 24) * 2 * Math.PI) * (baseValue * 0.4);
      entry[id] = Math.max(
        10,
        Math.round(baseValue + fluctuation + (Math.random() * 20 - 10))
      );
    });
    data.push(entry);
  });
  return data;
};

export const getAqiDetails = (pm25) => {
  let colorClass, status;
  if (pm25 <= 12) (colorClass = "bg-green-600"), (status = "Good");
  else if (pm25 <= 35) (colorClass = "bg-yellow-600"), (status = "Moderate");
  else if (pm25 <= 55)
    (colorClass = "bg-orange-600"), (status = "Unhealthy for Sensitive Groups");
  else if (pm25 <= 150) (colorClass = "bg-red-600"), (status = "Unhealthy");
  else (colorClass = "bg-purple-600"), (status = "Very Unhealthy");
  return { colorClass, status };
};

