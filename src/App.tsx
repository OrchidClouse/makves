import React from 'react';
import CustomLineChart from './components/charts/CustomLineChart';

const App: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <CustomLineChart />
    </div>
  );
};

export default App;
