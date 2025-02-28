import React from 'react';
import { DotProps } from 'recharts';
import { DataPoint } from '../../models/DataPoint';

const CustomizedDot: React.FC<DotProps & { payload?: DataPoint }> = (props) => {
  const { cx, cy, payload } = props;
  if (cx === undefined || cy === undefined) return null;
  const color = Math.abs(payload?.zScore || 0) > 1 ? '#FF0000' : '#8884d8';
  return <circle cx={cx} cy={cy} r={4} fill={color} stroke={color} />;
};

export default CustomizedDot;
