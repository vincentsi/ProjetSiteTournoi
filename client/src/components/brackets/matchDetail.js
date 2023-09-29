import React, { useState } from "react";

const MatchDetails = ({ selectedMatch, onReportWinner }) => {
  const [winner, setWinner] = useState(selectedMatch.winner || "");

  const handleWinnerChange = (userId) => {
    setWinner(userId);
  };

  const handleReportWinner = () => {
    onReportWinner(selectedMatch.id, winner);
  };

  return (
    <div className="selected-match-details">
      {selectedMatch && (
        <>
          <h3>Détails du match {selectedMatch.Round}</h3>
          <h4>user1: {selectedMatch.user1}</h4>
          <h4>user2: {selectedMatch.user2}</h4>

          {/* Afficher le gagnant s'il est déjà défini */}
          {selectedMatch.winner && (
            <p>Gagnant : {selectedMatch.winner}</p>
          )}

          <label>
            <input
              type="radio"
              name="winner"
              value={selectedMatch.user1}
              checked={winner === selectedMatch.user1}
              onChange={() => handleWinnerChange(selectedMatch.user1)}
            />
            {selectedMatch.user1}
          </label>
          <label>
            <input
              type="radio"
              name="winner"
              value={selectedMatch.user2}
              checked={winner === selectedMatch.user2}
              onChange={() => handleWinnerChange(selectedMatch.user2)}
            />
            {selectedMatch.user2}
          </label>

          <button onClick={handleReportWinner}>Signaler le vainqueur</button>
        </>
      )}
    </div>
  );
};

export default MatchDetails;
