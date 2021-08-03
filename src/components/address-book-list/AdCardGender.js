import React from 'react';
import './adCardGender.css';

const AdCardGender = ({ gender }) => {
  return (
    <div className="adCardGender">
        <p>{gender}</p>
    </div>
  );
};

export default AdCardGender;
