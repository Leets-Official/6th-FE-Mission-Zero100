import React from 'react';

const TextInput = ({ name }) => {
  return (
    <label>
    <input name={name}/>
    </label>
  );
};

export default TextInput;