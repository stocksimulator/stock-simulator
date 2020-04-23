import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Graph = (props) => {
  // const [xGraph, setX] = useState([]);
  // const [yGraph, setY] = useState([]);
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 3, 6],
          type: 'bar',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: 320, height: 240, title: 'Stocks Graph' }}
    />
  );
};

export default Graph;
