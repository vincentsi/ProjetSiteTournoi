import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { BracketAPI } from "../../actions/bracket.action";
import { MatchList } from "../brackets/matchList";

// Composant TournoiSelec qui affiche les détails d'un tournoi et permet à l'utilisateur de s'inscrire ou de se désinscrire
export function TournoiSelec({ tournoi }) {
  // Utilisation de useSelector pour récupérer les données de l'utilisateur depuis le state Redux
  const userData = useSelector((state) => state.USER.user);

  // Utilisation de l'état local pour suivre le statut d'inscription de l'utilisateur
  const [userInscrit, setUserInscrit] = useState(checkRegistrationStatus());
  // Utilisation de l'état local pour suivre le bouton actuellement sélectionné par l'utilisateur
  const [button, setButton] = useState("");
  // Fonction asynchrone pour vérifier le statut d'inscription de l'utilisateur
  async function checkRegistrationStatus() {
    try {
      if (userData.id != null) {
        // Vérifier si l'utilisateur est inscrit au tournoi en vérifiant s'il existe un bracket associé à l'utilisateur et au tournoi
        const userBracket = await BracketAPI.findOneUserBracket({
          tournoiId: tournoi.id,
          userId: userData.id,
        });

        if (userBracket) {
          // Si un bracket existe, cela signifie que l'utilisateur est inscrit au tournoi
          setUserInscrit(true);
        } else {
          // Sinon, l'utilisateur n'est pas inscrit au tournoi
          setUserInscrit(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Fonction asynchrone pour gérer l'inscription et la désinscription de l'utilisateur au tournoi
  async function handleInscription() {
    try {
      if (userData.id != null) {
        // Vérifier si l'utilisateur est déjà inscrit au tournoi en vérifiant s'il existe un bracket associé à l'utilisateur et au tournoi
        const userBracket = await BracketAPI.findOneUserBracket({
          tournoiId: tournoi.id,
          userId: userData.id,
        });

        if (userBracket) {
          // Si l'utilisateur est déjà inscrit, le désinscrire en supprimant le bracket associé
          await BracketAPI.DelOneUserBracket({
            tournoiId: tournoi.id,
            userId: userData.id,
          });
          setUserInscrit(false);
        } else {
          // Sinon, inscrire l'utilisateur en créant un nouveau bracket associé
         await BracketAPI.UTCreate({
            tournoiId: tournoi.id,
            userId: userData.id,
          });
          setUserInscrit(true);
        }
      } else {
        // Si l'utilisateur n'est pas connecté, afficher une alerte pour l'inciter à se connecter ou à créer un compte
        alert("Connectez-vous à votre compte utilisateur ou créez-le.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="tounois-selected-container">
      {/* Header du composant qui affiche l'image du tournoi, le titre et le bouton d'inscription/désinscription */}
      <div className="tounois-selected-header">
        <div className="row">
          <div className="col-4">tournoi picture</div>
          <div className="col-4">{tournoi.title}</div>
          <div className="col-4">
            {/* Afficher le bouton d'inscription/désinscription en fonction du statut d'inscription de l'utilisateur */}
            {userInscrit === true ? (
              <div className="nj_submit_btn">
                <ButtonPrimary onClick={handleInscription}>
                  Se désinscrire
                </ButtonPrimary>
              </div>
            ) : (
              <div className="nj_submit_btn">
                <ButtonPrimary onClick={handleInscription}>
                  S'inscrire
                </ButtonPrimary>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section de boutons pour basculer entre différentes informations du tournoi */}
      <div className="All-button">
        <div className="space-all-button">
          <input
            type="button"
            value="information"
            onClick={() => setButton("information")}
            id="information"
            name="information"
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="participants"
            onClick={() => setButton("participants")}
            id="participants"
            name="participants"
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="régles"
            onClick={() => setButton("régles")}
            id="régles"
            name="régles"
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="brackets"
            onClick={() => setButton("brackets")}
            id="brackets"
            name="brackets"
          />
        </div>
      </div>

      {/* Section qui affiche les informations spécifiques du tournoi en fonction du bouton sélectionné */}
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
