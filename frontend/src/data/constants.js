export const COLOR_PRIMARY = "#10b981";
export const COLOR_SECONDARY = "#3b82f6";
export const COLOR_BACKGROUND = "#1f2937";
export const COLOR_TEXT_LIGHT = "#e5e7eb";

export const STATION_DATA = [
  {
    id: "stn-001",
    name: "Bhubaneswar Central",
    lat: 20.2796,
    lng: 85.8825,
    aqi: 125,
    pm25: 70,
    pm10: 120,
    co: 8.5,
    co2: 500,
    o3: 55,
    no2: 45,
    o2: 20.9,
    temp: 30.5,
    humidity: 65,
    pm1: 50,
  },
  {
    id: "stn-002",
    name: "Cuttack Ring Road",
    lat: 20.4622,
    lng: 85.8943,
    aqi: 78,
    pm25: 40,
    pm10: 75,
    co: 6.2,
    co2: 450,
    o3: 40,
    no2: 30,
    o2: 21.0,
    temp: 28.1,
    humidity: 72,
    pm1: 50,
  },
  {
    id: "stn-003",
    name: "Puri Beach Monitoring",
    lat: 19.8037,
    lng: 85.8569,
    aqi: 42,
    pm25: 15,
    pm10: 30,
    co: 4.0,
    co2: 410,
    o3: 30,
    no2: 15,
    o2: 21.1,
    temp: 26.9,
    humidity: 80,
    pm1: 50,
  },
  {
    id: "stn-004",
    name: "Airport Industrial Zone",
    lat: 20.2505,
    lng: 85.8173,
    aqi: 188,
    pm25: 130,
    pm10: 200,
    co: 10.1,
    co2: 550,
    o3: 60,
    no2: 55,
    o2: 20.8,
    temp: 32.2,
    humidity: 60,
    pm1: 50,
  },
];

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
