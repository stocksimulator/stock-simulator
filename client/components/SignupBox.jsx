import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuth } from '../redux/actions/actions';
import FormInput from './FormInput';
import '../styles/Signup.scss';
import Button from './Button';

const Signup = () => {
  const dispatch = useDispatch()

  const [passwordMatch, setPasswordMatch] = useState(true)
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    signupFailed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  };

  const resetForm = () => {
    setUser({
      username: '',
      password: '',
      confirmPassword: '',
      signupFailed: true,
    })
  }

  const handleSubmit = (e) => {
    if(!user.username || !user.password) return
    
    if (user.password === user.confirmPassword) {
      fetch('/user/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((resp) => resp.json())
        .then((user) => {
          if(user && user.success) return dispatch(setUserAuth(user));
          else resetForm()
        })
        .catch((err) => {
          resetForm()
          console.log('Signup Component: fetch POST /user/signup/ ERROR: ', err);
        }) 
    } else {
      resetForm()
    }
    
  };

  return (
    <div className='signup-container'>
      <p>Don't have an account?</p>
      <span>Sign up for a free account below</span>
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
        <FormInput
          handleChange={handleChange}
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          label='Confirm Password'
          value={user.confirmPassword}
        />
        <Button onClick={handleSubmit} type='submit' mt1 primary>
          Sign Up
        </Button>
        {user.signupFailed ? <p className='try-again'>Try Again!</p> : ''}
      </div>
    </div>
  );
};

export default Signup;
