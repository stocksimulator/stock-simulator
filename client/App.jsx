import React from 'react';
import Header from './components/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import './styles/App.scss';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path='/' component={LandingPage}></Route>
      <Route exact path='/app/login' component={LoginPage}></Route>
    </Switch>
  </div>
);

export default App;
