import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../redux/actions/actions';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../styles/Header.scss';

const Header = ({userID}) => {
  const dispatch = useDispatch()
  
  const handleLogOut = () => {
    return dispatch(setUserAuth({
      _id: null,
      username: null,
      cash: 100000,
      stocks: [],
    }));
  }

 console.log('userID: ', userID)
  if (!userID) {
    return (
      <div className='header-container'>
      <Link to='/'>
        <div className='logo'>
          <span>
            <i className='fas fa-chart-line'></i>Stock Simulator
          </span>
        </div>
      </Link>
        <div className='options'>
        <Link to='/app/login'>
          <Button secondary mr1 >
            Login
          </Button>
        </Link>
        <Link to='/'>
          <Button primary >
            Sign Up
          </Button>
        </Link>
        </div>
      </div>
    );
  }
  return (
    <div className='header-container'>
    <Link to='/'>
      <div className='logo'>
        <span>
          <i className='fas fa-chart-line'></i>Stock Simulator
        </span>
      </div>
    </Link>
      <div className='options'>
      <Link to='/app/login'>
        <Button secondary mr1 onClick={handleLogOut}>
          Logout
        </Button>
      </Link>
      </div>
    </div>
  );
}


export default Header;
