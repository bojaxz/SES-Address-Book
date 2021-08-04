import React from 'react';
import './adFilter.css';
import { GENDER } from '../../constant';

const AdFilter = ({ query, handleQueryChange }) => {
  return (
      <div className="adFilter">
        <div className="inputGroup">
          <label htmlFor="genderFilter" className="genderInput">Gender Filter</label>
          <select
            name="genderFilter"
            value={query}
            onChange={handleQueryChange}
          >
            <option value="">Select Gender</option>
            {GENDER.map((gender) => (
              <option key={gender.value} value={gender.title}>
                {gender.title}
            </option>
            ))}
          </select>
        </div>
      </div>
  );
};

export default AdFilter;
