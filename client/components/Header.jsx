import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../styles/Header.scss';

const Header = () => (
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
      <Button secondary mr1>
        Login
      </Button>
    </Link>
    <Link to='/'>
      <Button primary>Sign Up</Button>
    </Link>
    </div>
  </div>
);

export default Header;
