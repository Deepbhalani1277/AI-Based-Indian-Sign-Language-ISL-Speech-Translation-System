import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;
