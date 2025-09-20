import React, { useCallback, useEffect, useState } from "react";
import { BracketAPI } from "../../actions/bracket.action";

const ManageMatches = ({ tournoi }) => {
  const [allMatches, setAllMatches] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState({});

  const loadAllMatches = useCallback(async () => {
    try {
      const response = await BracketAPI.affBracket({
        tournoiId: tournoi.id,
      });
      setAllMatches(response);
    } catch (error) {
      console.error(error);
    }
  }, [tournoi.id]);

  useEffect(() => {
    // Chargez les matchs lorsque le composant est monté
    loadAllMatches();
  }, [loadAllMatches]);

  const handleSelectWinner = async (matchId, winner = null) => {
    try {
      // Si winner est fourni (validation d'un signalement), l'utiliser
      // Sinon, utiliser la sélection courante
      const finalWinner = winner || selectedWinners[matchId];
      if (!finalWinner) return;

      await BracketAPI.updateMatch(matchId, finalWinner);

      setAllMatches((prevMatches) => {
        return prevMatches.map((match) => {
          if (match.id === matchId) {
            return {
              ...match,
              winner: winner,
            };
          }
          return match;
        });
      });

      // Vider la sélection après validation
      setSelectedWinners((prevSelectedWinners) => {
        const newSelectedWinners = { ...prevSelectedWinners };
        delete newSelectedWinners[matchId];
        return newSelectedWinners;
      });

      // Recharger tous les matchs pour voir les mises à jour
      await loadAllMatches();
    } catch (error) {
      console.error("Erreur lors de la sélection du vainqueur:", error);
    }
  };

  const handleWinnerChange = (matchId, winner) => {
    setSelectedWinners((prevSelectedWinners) => ({
      ...prevSelectedWinners,
      [matchId]: winner,
    }));
  };

  const handleCancelWinner = async (matchId) => {
    try {
      await BracketAPI.cancelWinner(matchId);

      setAllMatches((prevMatches) => {
        return prevMatches.map((match) => {
          if (match.id === matchId) {
            return {
              ...match,
              winner: null,
            };
          }
          return match;
        });
      });

      await loadAllMatches();
    } catch (error) {
      console.error("Erreur lors de l'annulation du vainqueur:", error);
    }
  };

  return (
    <div className="manage-matches-container">
      <h3 className="matches-title">🏆 Tous les matchs</h3>
      <div className="matches-grid">
        {allMatches.map((match) => (
          <div key={match.id} className="match-card-admin">
            <div className="match-header">
              <div className="match-round">
                <span className="round-badge">Round {match.Round}</span>
              </div>
              <div className="match-participants">
                <span className="vs-text">
                  {match.user1} vs {match.user2}
                </span>
              </div>
            </div>

            {match.winner ? (
              <div className="winner-status">
                {match.status === "reported" ? (
                  <div className="reported-winner">
                    <span className="reported-badge">
                      ⚠️ Vainqueur signalé: {match.winner}
                    </span>
                    <div className="admin-actions">
                      <button
                        className="validate-winner-button"
                        onClick={() =>
                          handleSelectWinner(match.id, match.winner)
                        }
                        title="Valider le vainqueur"
                        disabled={!match.user1 || !match.user2}
                      >
                        <span className="button-icon">✓</span>
                        Valider
                      </button>
                      <button
                        className="cancel-winner-button"
                        onClick={() => handleCancelWinner(match.id)}
                        title="Rejeter le vainqueur"
                      >
                        <span className="button-icon">✗</span>
                        Rejeter
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="validated-winner">
                    <span className="winner-badge">
                      🏆 Vainqueur validé: {match.winner}
                    </span>
                    <button
                      className="cancel-winner-button"
                      onClick={() => handleCancelWinner(match.id)}
                      title="Annuler le vainqueur"
                    >
                      <span className="button-icon">↶</span>
                      Annuler
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="winner-selection">
                {!match.user1 || !match.user2 ? (
                  <div className="incomplete-match">
                    <span className="incomplete-badge">
                      ⚠️ Match incomplet - En attente de joueurs
                    </span>
                    <p className="incomplete-text">
                      {!match.user1 && !match.user2
                        ? "Aucun joueur assigné à ce match"
                        : `Un seul joueur: ${match.user1 || match.user2}`}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="selection-title">
                      Sélectionner le vainqueur :
                    </div>
                    <div className="player-options">
                      <label className="player-option">
                        <input
                          type="radio"
                          name={`winner-${match.id}`}
                          value={match.user1}
                          checked={selectedWinners[match.id] === match.user1}
                          onChange={() =>
                            handleWinnerChange(match.id, match.user1)
                          }
                          className="winner-radio"
                        />
                        <span className="player-name">{match.user1}</span>
                      </label>
                      <label className="player-option">
                        <input
                          type="radio"
                          name={`winner-${match.id}`}
                          value={match.user2}
                          checked={selectedWinners[match.id] === match.user2}
                          onChange={() =>
                            handleWinnerChange(match.id, match.user2)
                          }
                          className="winner-radio"
                        />
                        <span className="player-name">{match.user2}</span>
                      </label>
                    </div>
                    <button
                      className="validate-button"
                      onClick={() => handleSelectWinner(match.id)}
                      disabled={
                        !selectedWinners[match.id] ||
                        !match.user1 ||
                        !match.user2
                      }
                    >
                      <span className="button-icon">✓</span>
                      Valider le vainqueur
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMatches;
