'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export const ValuesRadarChart = function ({
  values,
}: {
  values: { name: string; score: number; description: string }[];
}) {
  const chartData = values.map((value: { name: string; score: number }) => ({
    subject: value.name,
    score: value.score,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={500}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Values"
          dataKey="score"
          stroke="#2563eb"
          fill="#2563eb"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
