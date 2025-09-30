import React from 'react';

const Input = ({ name, placeholder, className }) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${className}`}
    />
  );
};

export default Input;