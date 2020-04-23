import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../redux/actions/actions';
import FormInput from './FormInput';
import '../styles/Login.scss';
import Button from './Button';

const LoginBox = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    username: '',
    password: '',
    loginFailed: false,
  });
  
  const resetForm = () => {
    setUser({
      username: '',
      password: '',
      loginFailed: true,
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    //client side validation
    if(!user.username || !user.password) return

    fetch('/user/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    .then((resp) => resp.json())
    .then((userdata) => {
      if(userdata && userdata.success) return dispatch(setUserAuth(userdata));
      else resetForm()
    })
    .catch((err) => {
      resetForm()
      console.log('Login Component: fetch POST /user/login/ ERROR: ', err);
    })
  };

  return (
    <div className='login-container'>
      <p>Already have an account?</p>
      <span>Sign in below</span>
      <div>
        <FormInput
          handleChange={handleChange}
          name='username'
          type='text'
          placeholder='Username'
          label='Username'
          value={user.username}
        />
        <FormInput
          handleChange={handleChange}
          name='password'
          type='password'
          placeholder='Password'
          label='Password'
          value={user.password}
        />
        <Button onClick={handleSubmit} type='submit' mt1 primary>
          Log In
        </Button>

        {user.loginFailed ? <p className='try-again'>Try Again!</p> : ''}
      </div>
    </div>
  );
};

export default LoginBox;
