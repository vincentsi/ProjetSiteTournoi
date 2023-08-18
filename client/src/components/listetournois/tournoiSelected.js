import React, { useState, useEffect } from "react";
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
  const [button, setButton] = useState("information");
  const [participants, setParticipants] = useState([]);
  const [userMatches, setUserMatches] = useState([]); // État local pour stocker les matchs de l'utilisateur connecté
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTournoi, setEditedTournoi] = useState({ ...tournoi })

  const handleInputChange = (e, field) => {
    const newValue = e.target.value;
    // Mettre à jour le tournoi édité en fonction du champ modifié
    setEditedTournoi((prevTournoi) => ({
      ...prevTournoi,
      [field]: newValue,
    }));
  };

  const saveChanges = async () => {
    try {
      // Enregistrer les modifications dans la base de données (utilisez votre API appropriée)
      await BracketAPI.updateTournoi(tournoi.id, editedTournoi);
      // Appeler la fonction fournie par le composant parent pour mettre à jour le tournoi
      // onUpdateTournoi(editedTournoi);
      setIsEditMode(false); // Sortir du mode éditable
    } catch (error) {
      console.error(error);
    }
  };
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
   
  
  // Utiliser useEffect pour charger les participants lorsque le bouton "participants" est sélectionné
  useEffect(() => {
    if (button === "participants") {
      affParticipant();
    }
  }, [button]);

  // Utiliser useEffect pour charger les matchs de l'utilisateur lorsque le bouton "match" est sélectionné
  useEffect(() => {
    if (button === "match" && userData.id) {
      loadUserMatches();
    }
  }, [button, userData]);

  // Fonction asynchrone pour charger les participants du tournoi
  async function affParticipant() {
    try {
      const response = await BracketAPI.affParticipant({
        tournoiId: tournoi.id,
      });
      setParticipants(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Fonction asynchrone pour charger les matchs de l'utilisateur connecté
  async function loadUserMatches() {
    try {
      const response = await BracketAPI.getUserMatches({
        tournoiId: tournoi.id,
        userId: userData.id,
      });
      setUserMatches(response);
    } catch (error) {
      console.error(error);
    }
  }
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
            { userData.id === tournoi.userId && (
              <div className="nj_submit_btn">
                <ButtonPrimary onClick={() => setIsEditMode(!isEditMode)}>
                  {isEditMode ? "Terminer l'édition" : "Modifier le tournoi"}
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
          <select value={button} onChange={(e) => setButton(e.target.value)}>
            <option value="tournament" >
              brackets/match
            </option>
            <option value="brackets">Bracket</option>
            <option value="match">Match</option>
          </select>
        </div>
      </div>

      {/* Section qui affiche les informations spécifiques du tournoi en fonction du bouton sélectionné */}
      <div className="tounois-selected-bas">
        <div className="information-tournoi">
          {button === "information" && (
            <>
              <div className="information-details">
                <p>information: {tournoi.information}</p>
                <p>Prix: {tournoi.prix}</p>
                <p>Horaire: {tournoi.horaire}</p>
                <p>Contact: {tournoi.contact}</p>
              </div>
            </>
          )}
        </div>
        <div className="button-participants-tournoi">
          {button === "participants" && (
            <>
              <h3>Participant:</h3>
              <div className="participants-tournoi">
                {participants.map((participant) => (
                  <div key={participant.id}>
                    {/* Afficher le nom d'utilisateur du participant */}
                    <p className="participant-username">
                      {participant.username}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="regles-tournoi">{button === "régles" && <>text</>}</div>
        <div className="brackets-tournoi">
          {button === "brackets" && (
            <>
              <MatchList tournoi={tournoi} />
            </>
          )}
        {button === "match" && (
          <div className="match-details">
            {userData.id ? (
              <div>
                <h3>Mes matchs :</h3>
                {userMatches.length === 0 ? (
                  <p>Vous n'avez aucun match pour ce tournoi.</p>
                ) : (
                  userMatches.map((match) => (
                    <div
                      key={match.id}
                      className="match-card"
                      onClick={() => setSelectedMatch(match)}
                    >
                      <h4>Match round: {match.Round}</h4>
                      <p>Statut: {match.winner}</p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p>Connectez-vous pour voir vos matchs.</p>
            )}

            {/* Afficher les détails du match sélectionné */}
            {selectedMatch && (
              <>
                <div className="selected-match-details">
                  {/* Afficher les détails du match sélectionné */}
                  <h3>Détails du match {selectedMatch.Round}</h3>
                  <h4>user1: {selectedMatch.user1}</h4>
                  <h4>user2: {selectedMatch.user2}</h4>
       
                </div>
           
              </>
            )}
          </div>
        )}
      </div>

      </div>
    </div>
  );
}

export default TournoiSelec;
