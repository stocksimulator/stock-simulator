import React, { useState } from 'react';
import FormInput from './FormInput';
import '../styles/Login.scss';
import Button from './Button';

const LoginBox = () => {
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

  return (
    <div className='login-container'>
      <p>Already have an account?</p>
      <span>Sign in below</span>
      <form>
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
