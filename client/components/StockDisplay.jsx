import React from 'react';
import '../styles/StockDisplay.scss';
import Button from './Button';

const StockDisplay = ({ name, price, shares }) => (
  <div className='stock-display'>
    <div className='values'>
      <p className='name'>NAME: {name} </p>
      <p className='price'>PRICE: ${price.toFixed(2)}</p>
      <p className='shares'>SHARES: {shares}</p>
      <p className='total'>TOTAL: ${(price * shares).toFixed(2)}</p>
    </div>
    <Button secondary>Sell</Button>
  </div>
);

export default StockDisplay;
