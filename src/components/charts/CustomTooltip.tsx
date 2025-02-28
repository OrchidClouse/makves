import React from 'react';
import { TooltipProps } from 'recharts';
import { DataPoint } from '../../models/DataPoint';

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const pointData = payload[0].payload as DataPoint;
    return (
      <div
        style={{
          background: '#333333',
          padding: '8px',
          borderRadius: 8,
        }}
      >
        <p>
          <strong>{label}</strong>
        </p>
        <p>Значение: {pointData.value}</p>
        <p>Z-Score: {pointData.zScore?.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
