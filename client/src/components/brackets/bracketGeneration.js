
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
