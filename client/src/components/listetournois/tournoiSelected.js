// import { useState } from "react";
// import { TournoiAPI } from "../../actions/tournoi.actions";
import React, { useState } from "react";

export function TournoiSelec({ tournoi }) {
  const [button, setButton] = useState("");
  console.log(tournoi)
  return (
    <div className="tounois-selected-container">
      <div className="tounois-selected-header">
        <div className="row">
          <div className="col-4">tournoi picture</div>
          <div className="col-4">{tournoi.title}</div>
          <div className="col-4">tournoi inscription</div>
        </div>
      </div>
      {/* <div className="tounois-selected-bas"> */}
      <div className="All-button">
        <div className="space-all-button">
          <input
            type="button"
            value="information"
            onClick={(e) => setButton(e.target.value)}
            id="information"
            name="information"
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="participants"
            // onChange={(e) => setUsername(e.target.value)}
            id="participants"
            name="participants"
            onClick={(e) => setButton(e.target.value)}
            // setButton
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="régles"
            onClick={(e) => setButton(e.target.value)}
            id="régles"
            name="régles"
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="brackets"
            onClick={(e) => setButton(e.target.value)}
            id="brackets"
            name="brackets"
          />
        </div>
      </div>
      <div className="tounois-selected-bas">
        <div className="information-tournoi">
          {button === "information" && <>{tournoi.information}</>}
        </div>
        <div className="participants-tournoi">
          {button === "participants" && <>text2</>}
        </div>
        <div className="regles-tournoi">
          {button === "régles" && <>text</>}
        </div>
        <div className="brackets-tournoi">
          {button === "brackets" && <>text2</>}
        </div>
      </div>
    </div>
  );
}
export default TournoiSelec;
