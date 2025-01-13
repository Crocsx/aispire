'use client';

import {
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

export const ValuesRadarChart = ({
  data,
}: {
  data: { name: string; value: number | null }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data.map((value) => ({
          subject: value.name,
          score: value.value,
          fullMark: 100,
        }))}
      >
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
