import React from 'react';
import '../../styles/components/bracket.css';

const ROUND_NAMES = {
  "1": "Premier Tour",
  "2": "Quarts de finale",
  "3": "Demi-finales",
  "4": "Finale"
};

const Player = ({ name, isWinner, isLoser }) => (
  <div className={`player ${isWinner ? 'winner' : isLoser ? 'loser' : ''}`}>
    <span className="player-name">{name || 'TBD'}</span>
    {isWinner && <span className="winner-badge">👑</span>}
  </div>
);

const Match = ({ match }) => (
  <div className={`bracket-match ${match.winner ? 'completed' : 'pending'}`}>
    <Player 
      name={match.user1}
      isWinner={match.winner === match.user1}
      isLoser={match.winner === match.user2}
    />
    <div className="match-separator">VS</div>
    <Player 
      name={match.user2}
      isWinner={match.winner === match.user2}
      isLoser={match.winner === match.user1}
    />
    {!match.winner && <div className="match-status">En attente</div>}
  </div>
);

const Round = ({ roundNumber, matches }) => (
  <div className={`bracket-round round-${roundNumber}`}>
    <div className="round-header">
      {ROUND_NAMES[roundNumber] || `Round ${roundNumber}`}
    </div>
    <div className="matches-container">
      {matches.map((match) => (
        <Match key={match.id} match={match} />
      ))}
    </div>
  </div>
);

const TournamentTree = ({ round = {} }) => {
  // Gestion du cas où round est undefined ou vide
  if (!round || Object.keys(round).length === 0) {
    return (
      <div className="tournament-bracket">
        <div className="empty-bracket">Aucun match disponible</div>
      </div>
    );
  }

  // Trier les rounds par numéro
  const sortedRounds = Object.entries(round).sort(([a], [b]) => Number(a) - Number(b));

  return (
    <div className="tournament-bracket">
      {sortedRounds.map(([roundNumber, matches]) => (
        <Round 
          key={roundNumber}
          roundNumber={roundNumber}
          matches={matches}
        />
      ))}
    </div>
  );
};

export default TournamentTree;