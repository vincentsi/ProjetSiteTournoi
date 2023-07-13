// import { useState } from "react";
// import { TournoiAPI } from "../../actions/tournoi.actions";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { BracketAPI } from "../../actions/bracket.action";
import { MatchList } from "../brackets/matchList";


export function TournoiSelec({ tournoi }) {
  const userData = useSelector((state) => state.USER.user);
  const [userInscrit, setUserInscrit] = useState(checkRegistrationStatus());
  const [button, setButton] = useState("");

  async function checkRegistrationStatus() {
    try {
      if (userData.id != null) {
        // const bracket = await BracketAPI.findOne({ id: tournoi.id });
        const userBracket = await BracketAPI.findOneUserBracket({
          tournoiId: tournoi.id,
          userId: userData.id,
        });
        if (userBracket) {
          console.log("test");
          setUserInscrit(true);
        } else {
          setUserInscrit(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function sincrireTournoi() {
    try {
      if (userData.id != null) {
        // const bracket = await BracketAPI.findOne({ id: tournoi.id });
        const userBracket = await BracketAPI.findOneUserBracket({
          tournoiId: tournoi.id,
          userId: userData.id,
        });
        if (userBracket) {
          await BracketAPI.DelOneUserBracket({
            tournoiId: tournoi.id,
            userId: userData.id,
          });
          setUserInscrit(false);
          console.log("ff");
        } else {
          const addUser = await BracketAPI.UTCreate({
            tournoiId: tournoi.id,
            userId: userData.id,
          });
          setUserInscrit(true);
          console.log(addUser);
        }
      } else {
        alert("Connecter vous a votre compte utilisateur ou créer le");
      }
    } catch (error) {
      console.error(error);
    }
  }
  const sinscrireButton = (
    <div className="nj_submit_btn">
      <ButtonPrimary
        // isDisabled={hasError()}
        onClick={() => {
          sincrireTournoi();
        }}
      >
        S'inscrire
      </ButtonPrimary>
    </div>
  );
  const desinscriptionButton = (
    <div className="nj_submit_btn">
      <ButtonPrimary
        // isDisabled={hasError()}
        onClick={() => {
          sincrireTournoi();
        }}
      >
        Se désinscrire
      </ButtonPrimary>
    </div>
  );
  return (
    <div className="tounois-selected-container">
      <div className="tounois-selected-header">
        <div className="row">
          <div className="col-4">tournoi picture</div>
          <div className="col-4">{tournoi.title}</div>
          <div className="col-4">
            {userInscrit === true && <>{desinscriptionButton}</>}
            {userInscrit !== true && <> {sinscrireButton}</>}
          </div>
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
          {button === "brackets" && (
            <>
              <MatchList tournoi={tournoi} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default TournoiSelec;
