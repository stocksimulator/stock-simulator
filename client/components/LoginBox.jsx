import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../redux/actions/actions';
import FormInput from './FormInput';
import '../styles/Login.scss';
import Button from './Button';

const LoginBox = () => {
  const dispatch = useDispatch()
  const [loginError, setLoginError] = useState(false)
  const [user, setUser] = useState({
    username: null,
    password: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/user/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    .then((resp) => {
      if (resp.status > 400) {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000);
        throw new Error('Unauthorized Access');
      }
      return resp.json();
    })
    .then((userdata) => {
      console.log('userdata', userdata)
      return dispatch(setUserAuth(userdata));
    })
    .catch((err) => console.log('Login Component: fetch POST /user/login/ ERROR: ', err));
  };

  return (
    <div className='login-container'>
      <p>Already have an account?</p>
      <span>Sign in below</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          name='username'
          type='text'
          placeholder='Username'
          label='Username'
        />
        <FormInput
          handleChange={handleChange}
          name='password'
          type='password'
          placeholder='Password'
          label='Password'
        />
        <Button type='submit' mt1 primary>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default LoginBox;
