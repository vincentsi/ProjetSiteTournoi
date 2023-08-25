import React from "react";

const HomeTournois = ({ title, description, subtitle, picture, onClick,horaire,nJoueur }) => {
  // console.log(leJeu)
  // console.log(name)
  return (
    <div onClick={onClick}>
      <div className="tournois-container">
        <div className="row">
          <div className="col-4">
          
            <p>
              <img
                src={picture}
                alt="tournoi-pic-tournoi"
                className="tournoi-pic-tournoi"
              />
            </p>
          </div>
          <div className="col-4">
            <p>{title}</p>
          </div>
          <div className="col-4">
            <p>{nJoueur} joueur </p>
            <p>{horaire}</p>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default HomeTournois;
