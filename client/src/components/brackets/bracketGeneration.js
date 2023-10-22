import React from "react";

export default function TournamentTree({ round }) {
  return (
    <div className="tournament-tree">
      {Object.keys(round).map((roundNumber) => (
        <div className={`round round-${roundNumber}`} key={roundNumber}>
          {round[roundNumber].map((match, matchIndex) => (
            <div
              className={`match`} key={match.id}
            >
             <div
                 className={`match ${match.winner === match.user1 ? "winner" : "loser"}`}> 
              <p>{match.user1}</p>
              </div>
              <div
                 className={`match ${match.winner === match.user2 ? "winner" : "loser"}`}> 
              <p>{match.user2}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}