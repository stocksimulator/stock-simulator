import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../components/SearchBox';
import ValueDisplay from './ValueDisplay';
import AddStock from './AddStock';
import Portfolio from './Portfolio';
import '../styles/DashboardContainer.scss';
import { updateData } from '../redux/actions/actions';

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
    setPortfolioValue(calcPortfolio(user.stocks));

    // Fetch user data on initial page load
    if (!fetched) {
      // fetch(`/user/getdata`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ _id: user._id }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     dispatch(updateData(data));
      //     setFetched(true);
      //   })
      //   .catch((err) => console.log('ERROR while getting user data: ', err));
    }
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
    // fetch(`/api/${searchSymbol}`)
    // .then(res => res.json())
    // .then(data => setSearchPrice(data.price))
    // .catch(err => console.log('ERROR while getting price: ', err))
    setSearchPrice(120);
  };

  const handleBuyClick = () => {
    // fetch(`/api/buy`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     _id: user._id,
    //     symbol: searchSymbol,
    //     shares: addShares,
    //     total: addShares * searchPrice,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => dispatch(updateData(data)))
    //   .catch((err) => console.log('ERROR while buying shares: ', err));
    const sampleUserData = {
      _id: null,
      username: null,
      cash: 90000,
      stocks: [
        { stock: 'AACG', shares: 1, currValue: 200 },
        { stock: 'ACRZ', shares: 5, currValue: 200 },
        { stock: 'ACRX', shares: 6, currValue: 500 },
      ],
    };
    dispatch(updateData(sampleUserData));
  };

  const handleSellClick = (e) => {
    // const id = e.target.id;
    // const stock = user.stocks[id].stock;
    // const currValue = user.stocks[id].currValue;
    // const shares = user.stocks[id].shares;
    // const total = currValue * shares;
    // fetch(`/api/sell`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     _id: user._id,
    //     symbol: stock,
    //     shares: shares,
    //     total: total,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => dispatch(updateData(data)))
    //   .catch((err) => console.log('ERROR while buying shares: ', err));
    const sampleUserData = {
      _id: null,
      username: null,
      cash: 90000,
      stocks: [
        { stock: 'AACG', shares: 1, currValue: 200 },
        { stock: 'ACRZ', shares: 5, currValue: 200 },
        { stock: 'ACRX', shares: 6, currValue: 500 },
      ],
    };
    dispatch(updateData(sampleUserData));
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
