import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { COLOR_BACKGROUND, COLOR_PRIMARY } from "../data/constants";

const StationLineChart = ({ data, stations, selectedStationId }) => {
  const colors = ["#f43f5e", "#14b8a6", "#f59e0b", "#8b5cf6", "#3b82f6", "#10b981"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
        <XAxis dataKey="time" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: COLOR_BACKGROUND,
            border: `1px solid ${COLOR_PRIMARY}`,
            color: "#fff",
          }}
        />
        <Legend />

        {stations.map((s, i) => {
          const stationKey = s.id || s._id || `station-${i}`;
          const stationName = s.name || s.station || `Station ${i + 1}`;

          return (
            <Line
              key={stationKey}
              type="monotone"
              dataKey={stationKey}
              name={stationName}
              stroke={colors[i % colors.length]}
              strokeWidth={stationKey === selectedStationId ? 3 : 2}
              dot={false}
              opacity={stationKey === selectedStationId ? 1 : 0.5}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StationLineChart;
