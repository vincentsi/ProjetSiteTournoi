import React from "react";

const  HomeTournois = ({  title , description, subtitle , onClick }) => {
  // console.log(leJeu)
  // console.log(name)
  return (
    <div onClick={onClick} >
      <div className="tournois-container" >
        <p className="card-text text_description">{title}</p>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        <p className="card-text text_description">{description}</p>
        <br></br>
      </div>
    </div>
  );
 
};

export default HomeTournois;
