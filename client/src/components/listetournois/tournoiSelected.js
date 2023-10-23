import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { BracketAPI } from "../../actions/bracket.action";
import { MatchList } from "../brackets/matchList";
import { TournoiAPI } from "../../actions/tournoi.actions";
import { updateTournoi } from "../../store/tournoi/tournois.reducer";
import UploadImgTournois from "./UploadImgTournois";
import MatchDetails from "../brackets/matchDetail";
import ManageMatches from "../brackets/manageMatchAdmin";
import AddAdmin from "./AddAdmin";
import { Link } from 'react-router-dom';

// Composant TournoiSelec qui affiche les détails d'un tournoi et permet à l'utilisateur de s'inscrire ou de se désinscrire
const TournoiSelec = ({ tournoi }) => {
  // Utilisation de useSelector pour récupérer les données de l'utilisateur depuis le state Redux
  const userData = useSelector((state) => state.USER.user);

  // Utilisation de l'état local pour suivre le statut d'inscription de l'utilisateur
  const [userInscrit, setUserInscrit] = useState(checkRegistrationStatus());
  // Utilisation de l'état local pour suivre le bouton actuellement sélectionné par l'utilisateur
  const [button, setButton] = useState("information");
  const [participants, setParticipants] = useState([]);
  const [userMatches, setUserMatches] = useState([]); // État local pour stocker les matchs de l'utilisateur connecté
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTournoi, setEditedTournoi] = useState({ ...tournoi });
  const [isOrganizer, setIsOrganizer] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (e, field) => {
    const newValue = e.target.value;
    // Mettre à jour le tournoi édité en fonction du champ modifié
    setEditedTournoi((prevTournoi) => ({
      ...prevTournoi,
      [field]: newValue,
    }));
  };

  async function checkUserRole(userId, tournoiId) {
    try {
      const response = await TournoiAPI.infoOrga({ id: tournoiId });

      const organizerUserId = response.id; // Récupère le userId de l'organisateur

      // Vérifie si l'utilisateur est l'organisateur
      if (organizerUserId === userId) {
        return true;
      }

      // Récupère la liste des administrateurs de tournoi
      const adminsResponse = await TournoiAPI.getTournamentAdmins({
        id: tournoiId,
      });

      // Vérifie si adminsResponse a une propriété "message"
      if (adminsResponse && adminsResponse.message) {
        // Si un message est présent, cela signifie qu'aucun administrateur n'a été trouvé
        return false;
      }

      // Si adminsResponse existe et ne contient pas de message, c'est une liste d'administrateurs
      if (adminsResponse) {
        const adminUserIds = adminsResponse.map((admin) => admin.id);

        if (adminUserIds.includes(userId)) {
          return true;
        }
      }

      // Si l'utilisateur n'est ni l'organisateur ni un administrateur
      return false;
    } catch (error) {
      console.error(
        "Erreur lors de la vérification du rôle de l'utilisateur.",
        error
      );
      return false;
    }
  }

  useEffect(() => {
    if (userData.id) {
      async function fetchData() {
        const isOrganizer = await checkUserRole(userData.id, tournoi.id);
        setIsOrganizer(isOrganizer);
      }

      fetchData();
    }
  }, [userData.id, tournoi.id]);

  const saveChanges = async () => {
    try {
      // Enregistrer les modifications dans la base de données (utilisez votre API appropriée)
      const test = await TournoiAPI.updateTournoi(editedTournoi);
      // Appeler la fonction fournie par le composant parent pour mettre à jour le tournoi
      dispatch(updateTournoi(editedTournoi));

      setIsEditMode(false); // Sortir du mode éditable
    } catch (error) {
      console.error("Erreur lors du lancement du tournoi:", error);
      alert("Une erreur est survenue lors du lancement du tournoi.");
    }
  };
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  async function launchTournament() {
    try {
      const updatedTournoi = await BracketAPI.genereBracket({
        tournoiId: tournoi.id,
      });

      dispatch(updateTournoi(updatedTournoi));

      setEditedTournoi({ ...tournoi, status: "Lancé" });

      alert("Le tournoi a été lancé avec succès !");
    } catch (error) {
      console.error(error);
    }
  }

  // Utiliser useEffect pour charger les participants lorsque le bouton "participants" est sélectionné
  useEffect(() => {
    if (button === "participants") {
      affParticipant();
    }
  }, [button]);

  // Utiliser useEffect pour charger les matchs de l'utilisateur lorsque le bouton "match" est sélectionné
  useEffect(() => {
    if (button === "match" && userData.username) {
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
        userId: userData.username,
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
  async function removeParticipant(participantId) {
    try {
      if (isOrganizer) {
        await BracketAPI.DelOneUserBracket({
          tournoiId: tournoi.id,
          userId: participantId,
        });
        affParticipant();
      } else {
        alert("Vous n'avez pas la permission de supprimer des participants.");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleReportWinner(matchId, winnerId) {
    try {
      console.log(matchId, winnerId);
      const updatedMatch = await BracketAPI.reportWinner(matchId, winnerId);

      // Mettez à jour l'état local pour refléter le vainqueur signalé
      setSelectedMatch((prevMatch) => ({
        ...prevMatch,
        winner: updatedMatch.winnerId,
      }));

      alert(`Le vainqueur du match a été signalé avec succès : ${winnerId}`);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        `Une erreur s'est produite lors de la signalisation du vainqueur :  ${error.response.data.message}`
      );
    }
  }

  return (
    <div className="tounois-selected-container">
      {/* Header du composant qui affiche l'image du tournoi, le titre et le bouton d'inscription/désinscription */}
      <div className="row tournois-selected-header">
        <div className="img_tournoiselec">
          <img
            src={tournoi.picture}
            alt="tournoi-pic-tournoi-selec"
            className="tournoi-pic-tournoi-selec"
          />
          {isEditMode && (
            <UploadImgTournois
              tournoiId={tournoi.id}
              tournoiTitle={tournoi.title}
            />
          )}
        </div>
        <div className="title_tournoiselec">
          {isEditMode ? (
            <>
              <label htmlFor="title">title:</label>
              <input
                type="text"
                id="title"
                value={editedTournoi.title}
                onChange={(e) => handleInputChange(e, "title")}
              />
            </>
          ) : (
            <pre>{tournoi.title}</pre>
          )}
        </div>

        <div className="all_ts_submit_btn">
          {tournoi.status !== "lancé" ? (
            <>
              {!isEditMode && (
                <>
                  {userInscrit ? ( // Si l'utilisateur est inscrit, afficher le bouton "Se désinscrire"
                    <ButtonPrimary onClick={handleInscription}>
                      Se désinscrire
                    </ButtonPrimary>
                  ) : (
                    // Sinon, afficher le bouton "S'inscrire"
                    <ButtonPrimary onClick={handleInscription}>
                      S'inscrire
                    </ButtonPrimary>
                  )}
                </>
              )}
              {isEditMode ? (
                <>
                  <div className="ts_submit_btn">
                    <button onClick={saveChanges}>
                      Enregistrer les modifications
                    </button>
                    <button onClick={() => setIsEditMode(false)}>
                      Annuler
                    </button>
                  </div>
                  <div className="add-admin-section">
                    <AddAdmin tournoiId={tournoi.id} />
                  </div>
                </>
              ) : (
                <>
                  {isOrganizer && (
                    <>
                      <div className="ts_submit_btn">
                        <ButtonPrimary onClick={() => launchTournament()}>
                          Lancer le tournoi
                        </ButtonPrimary>
                      </div>
                      <div className="ts_submit_btn">
                        <ButtonPrimary
                          onClick={() => setIsEditMode(!isEditMode)}
                        >
                          {"Modifier le tournoi"}
                        </ButtonPrimary>
                      </div>
                    </>
                  )}
                </>
              )}{" "}
            </>
          ) : (
            <div className="tStart">
              <p>tournois en cours </p>
            </div>
          )}
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
            <option value="tournament">brackets/match</option>
            <option value="brackets">Bracket</option>
            <option value="match">Match</option>
            {(isOrganizer ||
              (userData.isAdmin && userData.isTournamentAdmin)) && (
              <option value="all-matches">Tous les matchs</option>
            )}
          </select>
        </div>
      </div>

      {/* Section qui affiche les informations spécifiques du tournoi en fonction du bouton sélectionné */}
      <div className="tounois-selected-bas">
        <div className="information-tournoi">
          {button === "information" && (
            <>
              {isEditMode ? (
                <>
                  <div className="col-8">
                    <div className="info-label">
                      <label htmlFor="information">Information:</label>
                      <textarea
                        rows={10}
                        cols={70}
                        id="information"
                        value={editedTournoi.information}
                        onChange={(e) => handleInputChange(e, "information")}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="info-label">
                      <label htmlFor="horaire">horaire:</label>
                      <input
                        type="text"
                        id="horaire"
                        value={editedTournoi.horaire}
                        onChange={(e) => handleInputChange(e, "horaire")}
                      />
                    </div>
                    <div className="info-label">
                      <label htmlFor="contact">contact:</label>
                      <input
                        type="text"
                        id="contact"
                        value={editedTournoi.contact}
                        onChange={(e) => handleInputChange(e, "contact")}
                      />
                    </div>
                    <div className="info-label">
                      <label htmlFor="prix">Prix:</label>
                      <input
                        type="text"
                        id="prix"
                        value={editedTournoi.prix}
                        onChange={(e) => handleInputChange(e, "prix")}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-8">
                    <div className="info-label-ts">
                      <p>information:</p>
                      <p className="wrap-text-information">
                        {tournoi.information}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="info-label-ts">
                      <p>Horaire:</p>
                      <span>{tournoi.horaire}</span>
                    </div>
                    <div className="info-label-ts">
                      <p>Contact:</p>
                      <span>{tournoi.contact}</span>
                    </div>
                    <div className="info-label-ts">
                      <p>Prix:</p>
                      <span>{tournoi.prix}</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="button-participants-tournoi">
          {button === "participants" && (
            <>
              <h3>Participants :</h3>
              <div className="participants-tournoi">
                {participants.map((participant) => (
                  <div key={participant.id} className="participant-item">
                    {/* Utilisez le composant Link pour créer un lien vers le profil de l'utilisateur */}
                    <Link
                      to={`/profil/${participant.id}`}
                      className="participant-username"
                    >
                      {participant.username}
                    </Link>
                    {isOrganizer && (
                      // Bouton de suppression pour le créateur du tournoi
                      <button
                        className="remove-participant-btn"
                        onClick={() => removeParticipant(participant.id)}
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="regles-tournoi">
          {button === "régles" && (
            <>
              {isEditMode ? (
                <>
                  <label htmlFor="regle">regles:</label>
                  <textarea
                    rows={10}
                    cols={70}
                    type="text"
                    id="regle"
                    value={editedTournoi.regle}
                    onChange={(e) => handleInputChange(e, "regle")}
                  />
                </>
              ) : (
                <>
                  <p>regles:</p>

                  <p className="wrap-text-regles ">{tournoi.regle}</p>
                </>
              )}
            </>
          )}
        </div>
        <div className="brackets-tournoi">
          <div className="brackets-tournoi">
            {button === "brackets" && (
              <>
                <MatchList tournoi={tournoi} />
              </>
            )}
          </div>
          {button === "all-matches" && isOrganizer && (
            <ManageMatches tournoi={tournoi} />
          )}
          {button === "match" && (
            <div className="match-details">
              {userData.username ? (
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
                        {match.winner ? (
                          <p>Statut: {match.winner} a gagné</p>
                        ) : (
                          <p>Pas encore de gagnant pour ce match.</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p>Connectez-vous pour voir vos matchs.</p>
              )}

              {/* Afficher les détails du match sélectionné */}
              {selectedMatch && (
                <MatchDetails
                  selectedMatch={selectedMatch}
                  onReportWinner={handleReportWinner} // Passez la fonction de gestion du vainqueur
                />
              )}
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournoiSelec;
