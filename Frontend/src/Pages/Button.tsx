import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Button.css';

const Button: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/swipe');
  };

  return (
    <button className="begin-search-button" onClick={handleClick}>
      Begin Search Now
    </button>
  );
};

export default Button;