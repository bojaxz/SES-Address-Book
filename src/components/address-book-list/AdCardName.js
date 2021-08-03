import React from 'react';
import './adCardName.css';

const AdCardName = ({ firstName, lastName }) => {
  return <h2 className="adCardName">{firstName} {lastName}</h2>;
};

export default AdCardName;
