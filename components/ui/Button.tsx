'use client';
import React from 'react';

const Button = ({ text='Button', bgColor = 'btn-primary', onClick=()=>{}, className =''}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${bgColor} px-6 py-2 rounded-lg font-medium transition duration-200 cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;