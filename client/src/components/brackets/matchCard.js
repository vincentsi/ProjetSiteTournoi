import React, { useState } from "react";

export const MatchCard = ({ match }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="match-card" onClick={handleCardClick}>
      <h4>Match ID: {match.id}</h4>
      {showDetails && (
        <div>
          <p>Statut: {match.winner}</p>
          {/* Afficher d'autres détails du match ici si nécessaire */}
        </div>
      )}
    </div>
  );
};

