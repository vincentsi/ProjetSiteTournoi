
import React from "react";
// import { BracketAPI } from "../../actions/bracket.action";

export default function BracketGeneration({ user1, user2, winner, round }) {
  console.log(round);

  // if (round != 1){j++}

  return (
    <>
      {/* <div className="affiche_match_containers"> */}
      <div className="affiche_match">
        <div className="affiche_round">
          {round === 1 && (
            <div className="round1">
              {/* <div className="traitnextmatch">Next_Match</div> */}
               <div className="trait">
              <p>p {user1} </p>
              </div>
              <p> {user2}</p>
            </div>
          )}
        </div>

        <div className="affiche_round">
          {round === 2 && (
            <div className="round2">
              <div className="trait">
                <p>{user1 == null ? "waiting winner" : "player"} </p>
              </div>
              <p>{user2 == null ? "waiting winner" : "player"} </p>
              {/* <br></br> <br></br> <br></br> */}
            </div>
          )}
        </div>
        <div className="affiche_round">
          {round === 3 && (
            <div className="round3">
              <div className="trait">
              <p>{user1 == null ? "waiting winner" : "player"} </p>
              </div>
              <p>{user2 == null ? "waiting winner" : "player"} </p>
            </div>
          )}
        </div>
        <div className="affiche_round">
          {round === 4 && (
            <div className="round4">
              <p>{user1 == null ? "waiting winner" : "player"} </p>
              <p>{user2 == null ? "waiting winner" : "player"} </p>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
// import React from "react";


// export default function BracketGeneration({ matches }) {
//   // Fonction pour regrouper les matches par ronde
//   const groupMatchesByRound = () => {
//     const groupedMatches = {};
//     matches.forEach((match) => {
//       const { round } = match;
//       if (!groupedMatches[round]) {
//         groupedMatches[round] = [];
//       }
//       groupedMatches[round].push(match);
//     });
//     return groupedMatches;
//   };

//   const renderMatch = (match) => {
//     const { user1, user2, winner } = match;

//     const getUser1Name = () => {
//       return user1 ? user1 : "Waiting winner";
//     };

//     const getUser2Name = () => {
//       return user2 ? user2 : "Waiting winner";
//     };

//     return (
//       <div key={match.id} className={`match ${winner ? "completed" : ""}`}>
//         <div className={`team ${winner === user1 ? "winner" : ""}`}>
//           {getUser1Name()}
//         </div>
//         <div className="vs">VS</div>
//         <div className={`team ${winner === user2 ? "winner" : ""}`}>
//           {getUser2Name()}
//         </div>
//         {winner && <div className="arrow">&darr;</div>}
//       </div>
//     );
//   };

//   const groupedMatches = groupMatchesByRound();

//   return (
//     <div className="bracket">
//       {Object.keys(groupedMatches).map((round) => (
//         <div key={round} className="round">
//           {groupedMatches[round].map((match) => renderMatch(match))}
//         </div>
//       ))}
//     </div>
//   );
// }