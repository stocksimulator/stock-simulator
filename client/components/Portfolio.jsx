import React from 'react'
import StockDisplay from './StockDisplay';
import '../styles/Portfolio.scss';

const Portfolio = ({ stocks, handleSellClick}) => (
  <div className='portfolio'>
    <h2>PORTFOLIO</h2>
    {stocks.map((stock, i) => (
      <StockDisplay key={i} id={i} stock={stock.stock} currValue={stock.currValue} shares={stock.shares} handleSellClick={handleSellClick} />
    ))}
  </div>
);

export default Portfolio;
