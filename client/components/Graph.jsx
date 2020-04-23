import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Graph = ({ graph }) => {
  // const [graphX, setGraphX] = useState([]);
  // const [graphY, setGraphY] = useState([]);
  // console.log(graph);
  const x = [];
  const y = [];

  for (let key in graph) {
      x.push(key);
      y.push(Number(graph[key]['1. open']));
  }
  // setGraphX(x);
  // setGraphY(y);

  // console.log(x);

  return (
    <Plot
      data={[
        {
          x: x,
          y: y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ]}
      layout={{ width: 720, height: 440, title: 'Stocks Graph' }}
    />
  );
};

export default Graph;

// for(let key in data['Time Series (5min)']){

// }
