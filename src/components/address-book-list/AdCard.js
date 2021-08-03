import React from "react";
import AdCardHeader from "./AdCardHeader";
import AdCardGender from "./AdCardGender";
import AdCardName from "./AdCardName";
import AdCardAge from "./AdCardAge";
import "./adCard.css";
import Male from "../../img/Male.png";
import Female from "../../img/Female.png";

const AdCard = ({ data, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="adCard">
      <AdCardHeader
        firstName={data.firstName}
        lastName={data.lastName}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        id={data.id}
      />
      <div className="content">
        <div>
          <img
            src={data.gender === "male" ? Male : Female}
            alt="ID Placeholder"
          />
        </div>
        <div>
          <AdCardName firstName={data.firstName} lastName={data.lastName} />
          <hr />
          <AdCardGender gender={data.gender} />
          <hr />
          <AdCardAge age={data.age} />
        </div>
      </div>
    </div>
  );
};

export default AdCard;
