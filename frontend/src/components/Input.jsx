import React from 'react';

function Input({ placeholder, name, type }) {
  return (
    <input
      className="border border-grey-400 p-2 mb-2 rounded-md w-full"
      placeholder={placeholder}
      name={name}
      type={type}
    />
  );
}

export default Input;