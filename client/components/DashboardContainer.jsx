import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../redux/actions/actions';
import SearchBox from '../components/SearchBox';
import ValueDisplay from './ValueDisplay';
import AddStock from './AddStock';
import Portfolio from './Portfolio';
import Graph from './Graph.jsx';
import '../styles/DashboardContainer.scss';

const DashboardContainer = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fetched, setFetched] = useState(false);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [addShares, setAddShares] = useState('');
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [invalidKeyWord, setInvalidKeyWord] = useState(false);
  const [invalidShares, setinvalidShares] = useState(false);
  const [graph, setGraph] = useState([]);
  const [searchClick, setSearchClick] = useState(false);

  const calcPortfolio = (stocks) => {
    let total = stocks.reduce(
      (acc, curr) => (acc += curr.currValue * curr.shares),
      0
    );
    return total;
  };

  useEffect(() => {
    // Fetch user data on initial page load
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
    setinvalidShares(false);
  };

  const handleAddSharesChange = (e) => {
    const value = e.target.value;
    setAddShares(value);
  };

  const handleSearchClick = () => {
    setSearchClick(true);
    fetch(`/api/${searchSymbol}`)
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Invalide Search Keyword') {
          setInvalidKeyWord(true);
          return;
        } else {
          setGraph(data.graph);
          setSearchPrice(data.price);
          setInvalidKeyWord(false);
        }
      })
      .catch((err) => console.log('ERROR while getting price: ', err));
  };

  const handleBuyClick = () => {
    if (isNaN(Number(addShares) * Number(searchPrice))) {
      setinvalidShares(true);
      return;
    }
    setinvalidShares(false);
    setSearchSymbol('');
    fetch(`/api/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: user._id,
        symbol: searchSymbol.toUpperCase(),
        shares: addShares,
        total: addShares * searchPrice,
        currValue: searchPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateData(data));
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
    <div className="dashboard-container">
      <ValueDisplay cash={user.cash} portfolioValue={portfolioValue} />
      <SearchBox
        handleSearchChange={handleSearchChange}
        handleSearchClick={handleSearchClick}
        searchSymbol={searchSymbol}
      />
      {searchSymbol.length ? (
        <AddStock
          symbol={searchSymbol}
          price={searchPrice}
          handleAddSharesChange={handleAddSharesChange}
          addShares={addShares}
          searchSymbol={searchSymbol}
          handleBuyClick={handleBuyClick}
          invalidKeyWord={invalidKeyWord}
        />
      ) : null}
      {invalidKeyWord ? (
        <p className="validation">Please enter a valid ticker symbol </p>
      ) : (
        ''
      )}
      {invalidShares ? (
        <p className="validation">
          Please enter a valid number in the Shares field
        </p>
      ) : (
        ''
      )}
      {searchClick && searchSymbol.length ? <Graph graph={graph} /> : ''}
      <Portfolio stocks={user.stocks} handleSellClick={handleSellClick} />
    </div>
  );
};

export default DashboardContainer;
