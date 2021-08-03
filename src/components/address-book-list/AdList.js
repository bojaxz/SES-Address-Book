import React from 'react';
import AdCard from './AdCard';

import './adList.css';

const AdList = ({
  users,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div className="adList">
      {users.map((user) => (
        <AdCard
          key={user.id}
          data={user}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};

export default AdList;
