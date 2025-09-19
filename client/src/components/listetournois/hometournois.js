import React from "react";

const HomeTournois = ({
  title,
  description,
  subtitle,
  picture,
  onClick,
  horaire,
  nJoueur,
}) => {
  // console.log(leJeu)
  // console.log(name)
  return (
    <div onClick={onClick}>
      <div className="tournois-container">
        <img
          src={picture}
          alt="tournoi-pic-tournoi"
          className="tournoi-pic-tournoi"
        />
        <div className="tournois-content">
          <div className="tournois-info">
            <h3 className="tournois-title">{title}</h3>
            <div className="tournois-details">
              <div className="tournois-detail-item">
                <span className="detail-icon">👥</span>
                <span className="detail-text">{nJoueur} joueurs</span>
              </div>
              <div className="tournois-detail-item">
                <span className="detail-icon">⏰</span>
                <span className="detail-text">{horaire}</span>
              </div>
            </div>
          </div>
          <div className="tournois-overlay">
            <div className="tournois-badge">Rejoindre</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTournois;
