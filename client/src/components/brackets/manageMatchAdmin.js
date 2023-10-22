import React, { useState, useEffect } from "react";
import { BracketAPI } from "../../actions/bracket.action";

const ManageMatches = ({ tournoi }) => {
  const [allMatches, setAllMatches] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState({});

  useEffect(() => {
    // Chargez les matchs lorsque le composant est monté
    loadAllMatches();
  }, []);

  const loadAllMatches = async () => {
    try {
      const response = await BracketAPI.affBracket({
        tournoiId: tournoi.id,
      });
      setAllMatches(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectWinner = async (matchId) => {
    try {
      const winner = selectedWinners[matchId];
      const updatedMatch = await BracketAPI.updateMatch(matchId, winner);

      // Mettez à jour l'état local pour refléter le vainqueur signalé
      setAllMatches((prevMatches) => {
        return prevMatches.map((match) => {
          if (match.id === matchId) {
            return {
              ...match,
              winner: updatedMatch.winner,
            };
          }
          return match;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleWinnerChange = (matchId, winner) => {
    setSelectedWinners((prevSelectedWinners) => ({
      ...prevSelectedWinners,
      [matchId]: winner,
    }));
  };

  return (
    <div>
      <h3>Tous les matchs :</h3>
      {allMatches.map((match) => (
        <div key={match.id}>
          <p>Round: {match.Round}</p>
          <p>Participants: {match.user1} vs {match.user2}</p>
          
            <p>Statut: Vainqueur - {match.winner}</p>
          
            <div>
              <label>
                <input
                  type="radio"
                  name={`winner-${match.id}`}
                  value={match.user1}
                  checked={selectedWinners[match.id] === match.user1}
                  onChange={() => handleWinnerChange(match.id, match.user1)}
                />
                {match.user1}
              </label>
              <label>
                <input
                  type="radio"
                  name={`winner-${match.id}`}
                  value={match.user2}
                  checked={selectedWinners[match.id] === match.user2}
                  onChange={() => handleWinnerChange(match.id, match.user2)}
                />
                {match.user2}
              </label>
              <button onClick={() => handleSelectWinner(match.id)}>Valider</button>
            </div>
         
        </div>
      ))}
    </div>
  );
};

export default ManageMatches;
