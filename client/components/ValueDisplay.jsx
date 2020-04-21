import React from 'react';
import '../styles/ValueDisplay.scss';

const ValueDisplay = ({ cash, portfolioValue }) => (
  <div className='value-display'>
    <span className='cash'>Cash: ${cash}</span>
    <span className='portfolio-value'>Portfolio Value: ${portfolioValue}</span>
    <span className='total-value'>Total Value: ${cash + portfolioValue}</span>
  </div>
);

export default ValueDisplay;
