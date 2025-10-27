import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COLOR_BACKGROUND, COLOR_PRIMARY } from '../data/constants';
import '../App.css';

const StationLineChart = ({ data, stations, selectedStationId }) => {
  const colors = ['#f43f5e', '#14b8a6', '#f59e0b', '#8b5cf6', '#3b82f6', '#10b981'];

  const getStationColor = (index) => colors[index % colors.length];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
        <XAxis dataKey="time" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" label={{ value: 'PM2.5 (µg/m³)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
        <Tooltip
          contentStyle={{ backgroundColor: COLOR_BACKGROUND, border: `1px solid ${COLOR_PRIMARY}`, borderRadius: '8px', color: '#fff' }}
          labelStyle={{ color: COLOR_PRIMARY, fontWeight: 'bold' }}
        />
        <Legend wrapperStyle={{ color: '#f3f4f6', paddingTop: '10px' }} />
        {stations.map((station, index) => {
          const key = station.id || station._id;
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={station.station || station.name}
              stroke={getStationColor(index)}
              strokeWidth={key === selectedStationId ? 4 : 2}
              dot={false}
              activeDot={{ r: 6, fill: getStationColor(index) }}
              opacity={key === selectedStationId ? 1 : 0.6}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StationLineChart;
