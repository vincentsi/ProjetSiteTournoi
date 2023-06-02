

import React from "react";
import { BracketAPI } from "../../actions/bracket.action";

export default function BracketGeneration({user1, user2,winner}) {
  console.log(user1)

  return (
    <>
    <div id="tree">
    <div class="level">
        <div class="item">
          <p>player {user1} </p>
          <p>player {user2}</p>
       </div>
    </div>
      <div class="level">
        <div class="item">
          <p>player 1 VS player 5</p>
          <p>player 2 VS player 6</p>
        </div>
    </div>
    <div class="level">
        <div class="item">
          <p>player 1 VS player 6</p> 
        </div>
     </div>
</div>
  {/* <div className="match-container" >
        <p className="">{user1}</p>
        <p className="">{user2}</p>
       
        <br></br>
      </div> */}
    </>
  );
}
