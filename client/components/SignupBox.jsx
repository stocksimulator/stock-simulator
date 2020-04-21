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
    username: null,
    password: null,
    confirmPassword: null,
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

    if (user.password === user.confirmPassword) {
      // fetch('/user/signup/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(user),
      // })
      //   .then((resp) => {
      //     if (resp.status > 400) {
      //       throw new Error('Unsuccessful signup');
      //     }
      //     return resp.json();
      //   })
      //   .then((user) => {
      //     return dispatch(setUserAuth(user));
      //   })
      //   .catch((err) => console.log('Signup Component: fetch POST /user/signup/ ERROR: ', err));
      const userdata = {_id: '3123123412412', username: 'signup'}
      return dispatch(setUserAuth(userdata));
    } else {
      setPasswordMatch(false);
      setTimeout(() => setPasswordMatch(true), 2000);
    }
    
  };

  return (
    <div className='signup-container'>
      <p>Don't have an account?</p>
      <span>Sign up for a free account below</span>
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
        <FormInput
          handleChange={handleChange}
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          label='Confirm Password'
        />
        <Button type='submit' mt1 primary>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
