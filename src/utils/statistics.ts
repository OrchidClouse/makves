import { DataPoint } from '../models/DataPoint';

export const computeStats = (data: DataPoint[]) => {
  const n = data.length;
  const mean = data.reduce((sum, d) => sum + d.value, 0) / n;
  const variance =
    data.reduce((sum, d) => sum + Math.pow(d.value - mean, 2), 0) / n;
  return { mean, stdDev: Math.sqrt(variance) };
};

export const addZScore = (data: DataPoint[]) => {
  const { mean, stdDev } = computeStats(data);
  return data.map((d) => ({
    ...d,
    zScore: stdDev ? (d.value - mean) / stdDev : 0,
  }));
};
