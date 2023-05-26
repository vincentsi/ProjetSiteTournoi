// import { useState } from "react";
// import { TournoiAPI } from "../../actions/tournoi.actions";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { BracketAPI } from "../../actions/bracket.action";
import { ParticipantInscrit } from "../brackets/participant";

export function TournoiSelec({ tournoi }) {
  const [button, setButton] = useState("");
  console.log(tournoi);

  const userData = useSelector((state) => state.USER.user);
 
  async function sincrireTournoi() {
    if (userData.id != null) {
      const bracket = await BracketAPI.findOne({ listetournoiId: tournoi.id });
      const userBracket = await BracketAPI.findOneUserBracket({
        bracketId: bracket.id,
        userId: userData.id
      });
      console.log(userBracket.userId);
      if (userBracket) {
        alert("vous etez deja inscrit");
      } else {
        const addUser = await BracketAPI.UBCreate({
          bracketId: bracket.id,
          userId: userData.id,
        });
        console.log(addUser);
      }
    } else {
      alert("Connecter vous a votre compte utilisateur ou créer le");
    }
  }
  const sinscrireButton = (
    <div className="nj_submit_btn">
      <ButtonPrimary
        // isDisabled={hasError()}
        onClick={() => sincrireTournoi()}
      >
        S'inscrire
      </ButtonPrimary>
    </div>
  );
  return (
    <div className="tounois-selected-container">
      <div className="tounois-selected-header">
        <div className="row">
          <div className="col-4">tournoi picture</div>
          <div className="col-4">{tournoi.title}</div>
          <div className="col-4">{sinscrireButton}</div>
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
        <div className="regles-tournoi">{button === "régles" && <>text</>}</div>
        <div className="brackets-tournoi">
          {button === "brackets" && <>text2</>}
        </div>
      </div>
    </div>
  );
}
export default TournoiSelec;
