import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import SearchBox from '../components/SearchBox';
import ValueDisplay from './ValueDisplay';
import AddStock from './AddStock';
import Portfolio from './Portfolio';
import '../styles/DashboardContainer.scss'

const DashboardContainer = () => {
  const user = useSelector(state => state.user)

  const [portfolioValue, setPortfolioValue] = useState(0)

  const calcPortfolio = (stocks) => {
    let total = stocks.reduce((acc, curr) => acc += (curr.price * curr.shares), 0)
    return total
  }

  useEffect(() => {
    setPortfolioValue(calcPortfolio(user.stocks))
  })

  return(
    <div className='dashboard-container'>
      <ValueDisplay cash={user.cash} portfolioValue={portfolioValue}/>
      <SearchBox />
      <AddStock/>
      <Portfolio stocks={user.stocks} />
    </div>
  );
};

export default DashboardContainer;
