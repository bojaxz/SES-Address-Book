import React from 'react';
import './adForm.css';
import AdEntry from './AdEntry';

const AdForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  age,
  setAge,
  gender,
  setGender,
  isEdit,
  clearInput,
  handleAddOrEditClick,
}) => {
  return (
    <div className="adForm">
      {!isEdit && (
        <h1>SES Address Book</h1>
      )}
      
      <AdEntry
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        isEdit={isEdit}
        clearInput={clearInput}
        handleAddOrEditClick={handleAddOrEditClick}
      />
    </div>
  );
};

export default AdForm;
