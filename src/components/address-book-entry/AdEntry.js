import React from 'react';
import { GENDER } from './../../constant';

const AdEntry = ({
  isEdit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  age,
  setAge,
  gender,
  setGender,
  clearInput,
  handleAddOrEditClick,
}) => {
  const buttonContent = isEdit ? 'Change' : 'Add';
  return (
    <div>
      <div className="inputGroup">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Choose Gender</option>
          {GENDER.map((gender) => (
            <option key={gender.value} value={gender.title}>
              {gender.title}
            </option>
          ))}
        </select>
      </div>
      <button className="button" onClick={handleAddOrEditClick}>
        {buttonContent}
      </button>
      <button className="button" onClick={clearInput}>
        Clear
      </button>
    </div>
  );
};

export default AdEntry;
