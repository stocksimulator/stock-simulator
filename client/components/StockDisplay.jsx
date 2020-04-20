import React from 'react';
import '../styles/StockDisplay.scss';
import Button from './Button';

const StockDisplay = ({ stock, currValue, shares, handleSellClick, id }) => (
  <div className='stock-display'>
    <div className='values'>
      <p className='name'>NAME: {stock} </p>
      <p className='price'>PRICE: ${currValue.toFixed(2)}</p>
      <p className='shares'>SHARES: {shares}</p>
      <p className='total'>TOTAL: ${(currValue * shares).toFixed(2)}</p>
    </div>
    <Button id={id} onClick={handleSellClick} secondary>Sell All</Button>
  </div>
);

export default StockDisplay;
