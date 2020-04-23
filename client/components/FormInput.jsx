import React from 'react';
import '../styles/FormInput.scss'

const FormInput = ({ label, name, type, handleChange, placeholder, value }) => (
  <div className='form-input-container'>
    <label htmlFor={name}>{label}</label>
    <input
      className='form-input'
      name={name}
      type={type}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    ></input>
  </div>
);

export default FormInput;
