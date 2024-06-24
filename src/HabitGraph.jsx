import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const colors = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'
];

const HabitGraph = ({ data, habits }) => {
  return (
    <div style={{ width: '100%', height: 400, marginTop: '30px', marginBottom: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Habits Overview</h2>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          {habits.map((habit, index) => (
            <Line 
              key={habit.name}
              type="monotone" 
              dataKey={habit.name} 
              stroke={colors[index % colors.length]} 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitGraph;