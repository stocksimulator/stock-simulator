import React, { useState } from 'react';
import FormInput from './FormInput';
import '../styles/Signup.scss';
import Button from './Button';

const Signup = () => {
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

  return (
    <div className='signup-container'>
      <p>Don't have an account?</p>
      <span>Sign up for a free account below</span>
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
