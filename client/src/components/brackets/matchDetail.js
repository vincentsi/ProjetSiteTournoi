import React, { useEffect, useState } from "react";

const MatchDetails = ({ selectedMatch, onReportWinner }) => {
  const [winner, setWinner] = useState("");

  useEffect(() => {
    // Réinitialiser le winner quand le match change
    setWinner(selectedMatch?.winner || "");
  }, [selectedMatch]);

  const handleWinnerChange = (userId) => {
    setWinner(userId);
  };

  const handleReportWinner = () => {
    if (!winner) return; // Vérifier qu'un vainqueur est sélectionné
    onReportWinner(selectedMatch.id, winner);
    setWinner(""); // Vider la sélection après envoi
  };

  return (
    <div className="match-detail-container">
      {selectedMatch && (
        <>
          <div className="match-detail-header">
            <h3 className="match-title">
              🎮 Match Round {selectedMatch.Round}
            </h3>
            <div className="match-participants">
              <span className="participant">{selectedMatch.user1}</span>
              <span className="vs-separator">VS</span>
              <span className="participant">{selectedMatch.user2}</span>
            </div>
          </div>

          {/* Afficher le gagnant s'il est déjà défini */}
          {selectedMatch.winner && (
            <div className="winner-display">
              <span className="winner-badge">
                🏆 Vainqueur: {selectedMatch.winner}
              </span>
            </div>
          )}

          {!selectedMatch.winner && (
            <div className="winner-selection-section">
              <div className="selection-title">Sélectionner le vainqueur :</div>
              <div className="player-selection">
                <label className="player-choice">
                  <input
                    type="radio"
                    name="winner"
                    value={selectedMatch.user1}
                    checked={winner === selectedMatch.user1}
                    onChange={() => handleWinnerChange(selectedMatch.user1)}
                    className="winner-radio"
                  />
                  <span className="player-name">{selectedMatch.user1}</span>
                </label>
                <label className="player-choice">
                  <input
                    type="radio"
                    name="winner"
                    value={selectedMatch.user2}
                    checked={winner === selectedMatch.user2}
                    onChange={() => handleWinnerChange(selectedMatch.user2)}
                    className="winner-radio"
                  />
                  <span className="player-name">{selectedMatch.user2}</span>
                </label>
              </div>

              <button
                className="report-winner-button"
                onClick={handleReportWinner}
                disabled={
                  !winner || !selectedMatch.user1 || !selectedMatch.user2
                }
              >
                <span className="button-icon">🏆</span>
                Signaler le vainqueur
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MatchDetails;
