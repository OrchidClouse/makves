import React, { useState } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ReferenceLine,
} from 'recharts';
import CustomizedLine from './CustomizedLine';
import CustomizedDot from './CustomizedDot';
import CustomTooltip from './CustomTooltip';
import { DataPoint } from '../../models/DataPoint';
import { addZScore, computeStats } from '../../utils/statistics';

const data: DataPoint[] = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 200 },
  { name: 'D', value: 278 },
  { name: 'E', value: 189 },
  { name: 'F', value: 239 },
  { name: 'G', value: 349 },
];

const CustomLineChart: React.FC = () => {
  const processedData = addZScore(data);
  const { mean, stdDev } = computeStats(data);

  const upperThreshold = mean + stdDev;
  const lowerThreshold = mean - stdDev;

  const [showReferenceLines, setShowReferenceLines] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <h2>График с Z-Score</h2>
        <p>
          Участки графика, для которых |z-score| &gt; 1, выделены красным.
          Наведите на точку, чтобы увидеть подробности.
        </p>
        <label>
          <input
            type='checkbox'
            checked={showReferenceLines}
            onChange={() => setShowReferenceLines(!showReferenceLines)}
          />
          Показать референс-линии
        </label>
      </div>
      <ResponsiveContainer width='100%' height={350}>
        <LineChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {showReferenceLines && (
            <>
              <ReferenceLine
                y={upperThreshold}
                stroke='#FF0000'
                strokeDasharray='3 3'
                label='Порог +1'
              />
              <ReferenceLine
                y={lowerThreshold}
                stroke='#FF0000'
                strokeDasharray='3 3'
                label='Порог -1'
              />
            </>
          )}
          <Line
            type='monotone'
            dataKey='value'
            stroke='#8884d8'
            isAnimationActive={true}
            dot={(props) => <CustomizedDot {...props} />}
            shape={(props: any) => <CustomizedLine {...props} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
