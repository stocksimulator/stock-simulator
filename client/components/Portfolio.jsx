import React from 'react';
import StockDisplay from './StockDisplay';
import '../styles/Portfolio.scss';

const Portfolio = ({ stocks,}) => (
  <div className='portfolio'>
    <h2>PORTFOLIO</h2>
    {stocks.map((stock, i) => (
      <StockDisplay key={i} name={stock.name} price={stock.price} shares={stock.shares} />
    ))}
  </div>
);

export default Portfolio;
