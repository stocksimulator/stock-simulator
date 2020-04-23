import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//changes
// const io = require('socket.io-client');
// import socketIOClient from "socket.io-client";
//change ^
import { updateData } from '../redux/actions/actions';
import SearchBox from '../components/SearchBox';
import ValueDisplay from './ValueDisplay';
import AddStock from './AddStock';
import Portfolio from './Portfolio';
import '../styles/DashboardContainer.scss';

const DashboardContainer = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fetched, setFetched] = useState(false);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [addShares, setAddShares] = useState('');
  const [portfolioValue, setPortfolioValue] = useState(0);

  const calcPortfolio = (stocks) => {
    let total = stocks.reduce((acc, curr) => (acc += curr.currValue * curr.shares), 0);
    return total;
  };

  useEffect(() => {
    // Fetch user data on initial page load
    // const socket = socketIOClient()
    if (!fetched) {
      fetch(`/user/getdata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: user._id }),
      })
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateData(data));
        setFetched(true);
      })
      .catch((err) => console.log('ERROR while getting user data: ', err));
    }
    setPortfolioValue(calcPortfolio(user.stocks));
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchSymbol(value);
  };

  const handleAddSharesChange = (e) => {
    const value = e.target.value;
    setAddShares(value);
  };

  const handleSearchClick = () => {
    fetch(`/api/${searchSymbol}`)
    .then(res => res.json())
    .then(data => setSearchPrice(data.price))
    .catch(err => console.log('ERROR while getting price: ', err))
  };

  const handleBuyClick = () => {
    console.log('user???????', user)
    fetch(`/api/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: user._id,
        symbol: searchSymbol,
        shares: addShares,
        total: addShares * searchPrice,
        currValue: searchPrice
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('data',data)
      dispatch(updateData(data))
    })
    .catch((err) => console.log('ERROR while buying shares: ', err));
  };

  const handleSellClick = (e) => {
    const id = e.target.id;
    const stock = user.stocks[id].stock;
    const currValue = user.stocks[id].currValue;
    const shares = user.stocks[id].shares;
    const total = currValue * shares;
    fetch(`/api/sell`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: user._id,
        symbol: stock,
        shares: shares,
        total: total,
      }),
    })
    .then((res) => res.json())
    .then((data) => dispatch(updateData(data)))
    .catch((err) => console.log('ERROR while buying shares: ', err));
  };

  return (
    <div className='dashboard-container'>
      <ValueDisplay cash={user.cash} portfolioValue={portfolioValue} />
      <SearchBox handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} />
      {searchSymbol.length ? (
        <AddStock
          symbol={searchSymbol}
          price={searchPrice}
          handleAddSharesChange={handleAddSharesChange}
          addShares={addShares}
          searchSymbol={searchSymbol}
          handleBuyClick={handleBuyClick}
        />
      ) : null}
      <Portfolio stocks={user.stocks} handleSellClick={handleSellClick} />
    </div>
  );
};

export default DashboardContainer;
