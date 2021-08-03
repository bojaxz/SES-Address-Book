import React from 'react';
import './adCardHeader.css';

const AdCardHeader = ({
  id,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div className="adCardHeader">
      <button
        className="adCardHeader__editButton"
        onClick={handleEditClick}
        value={id}
      >
        Edit
    </button>
      <button
        className="adCardHeader__deleteButton"
        onClick={handleDeleteClick}
        value={id}
      >
        Del
      </button>
    </div>
  );
};

export default AdCardHeader;
