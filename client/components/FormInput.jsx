import React from 'react';
import '../styles/FormInput.scss'

const FormInput = ({ label, name, type, handleChange, placeholder }) => (
  <div className='form-input-container'>
    <label htmlFor={name}>{label}</label>
    <input
      className='form-input'
      name={name}
      type={type}
      onChange={handleChange}
      placeholder={placeholder}
    ></input>
  </div>
);

export default FormInput;
