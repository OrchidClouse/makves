import React from 'react';

interface CustomizedLineProps {
  points?: any[];
}

const CustomizedLine: React.FC<CustomizedLineProps> = ({ points }) => {
  if (!points || points.length === 0) return null;

  interface Segment {
    points: any[];
    color: string;
  }
  const segments: Segment[] = [];
  // Инициализируем цвет первой точки
  let currentColor =
    Math.abs(points[0].payload.zScore) > 1 ? '#FF0000' : '#8884d8';
  let segmentPoints = [points[0]];

  // Группируем последовательные точки с одинаковым цветом
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    const pointColor =
      Math.abs(point.payload.zScore) > 1 ? '#FF0000' : '#8884d8';
    if (pointColor === currentColor) {
      segmentPoints.push(point);
    } else {
      segments.push({ points: [...segmentPoints], color: currentColor });
      // Для плавности линии дублируем точку перехода
      segmentPoints = [points[i - 1], point];
      currentColor = pointColor;
    }
  }
  segments.push({ points: segmentPoints, color: currentColor });

  return (
    <g>
      {segments.map((segment, index) => {
        const d = segment.points.reduce(
          (acc: string, p: any, i: number) =>
            i === 0 ? `M${p.x},${p.y}` : `${acc} L${p.x},${p.y}`,
          ''
        );
        return (
          <path
            key={index}
            d={d}
            stroke={segment.color}
            fill='none'
            strokeWidth={2}
          />
        );
      })}
    </g>
  );
};

export default CustomizedLine;
