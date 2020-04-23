import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './styles/App.scss';

const App = () => {
  const userID = useSelector(state => state.user._id)

  return (
    <div>
      <Header userID={userID}/>
      <Switch>
        <Route exact path='/' render={() => userID ? (<Redirect to='/app/dashboard'/>) : (<LandingPage/>)}></Route>
        <Route path='/app/login' render={() => userID ? (<Redirect to='/app/dashboard'/>) : (<LoginPage/>)}></Route>
        <Route path='/app/dashboard' render={() => userID ? (<DashboardPage/>) : (<LoginPage/>)}></Route>
      </Switch>
    </div>
  );
};

export default App;
