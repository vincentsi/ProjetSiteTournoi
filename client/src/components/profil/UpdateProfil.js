import React, { useState, useEffect } from "react";
import { dateParser } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { UserAPI, updateBio, updateRank } from "../../actions/user.actions";
import { JeuAPI } from "../../actions/pjeu.actions";
import { setUserRankss, updateUserRank } from "../../store/user/user.reducer";
import { setUser } from "../../store/user/user.reducer";
import axios from "axios";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(""); // État pour stocker le jeu sélectionné
  const [gameList, setGameList] = useState([]); // État pour stocker la liste des jeux prédéfinis
  const [gameRanks, setGameRanks] = useState([]); // État pour stocker les rangs prédéfinis du jeu sélectionné
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedGameName, setSelectedGameName] = useState("Sélectionnez un jeu");
  const [userRanks, setUserRanks] = useState([]);
  const [error, setError] = useState(null);
  const userData = useSelector((state) => state.USER.user);
  const dispatch = useDispatch();

  const jeuList = useSelector((store) => store.JEU.jeuList);
  useEffect(() => {
    setGameList(jeuList);
   fetchUserRanks(userData.id);
  }, [jeuList, userData]);

  const fetchUserRanks = async () => {
    if (!userData.id) {
      // Vérifiez si userId est défini, sinon ne faites rien
      return;
    }
    try {

      const response = await UserAPI.affRankUser({ userId: userData.id }); // Remplacez par l'appel API approprié pour récupérer les rangs de l'utilisateur

      dispatch(setUserRankss(response));
      setUserRanks(response); // Mettez à jour l'état avec les rangs de l'utilisateur
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des rangs de l'utilisateur :",
        error
      );
      setError(
        "Une erreur s'est produite lors de la récupération des rangs de l'utilisateur."
      );
    }
  };

  const handleGameChange = async (selectedGameId) => {
    try {
      console.log("Selected Game ID:", selectedGameId);
      setSelectedGame(selectedGameId);

      // Recherchez l'objet de jeu correspondant au nom du jeu sélectionné
      const selectedGameObj = gameList.find(
        (game) => game.id.toString() === selectedGameId.toString()
      );
      
      console.log("Selected Game Object:", selectedGameObj);
    
      if (selectedGameObj) {
        // Si le jeu est trouvé, utilisez son ID pour récupérer les rangs
        const gameId = selectedGameObj.id;

        // Effectue une requête au backend pour récupérer les rangs prédéfinis pour le jeu sélectionné
        const response = await JeuAPI.infoRank({ jeuId: gameId });
        console.log("Ranks Response:", response);

        if (Array.isArray(response)) {
          setGameRanks(response); // Met à jour l'état avec le tableau de noms de rangs
          setSelectedRank(""); // Réinitialise le rang sélectionné car il pourrait ne pas être valide pour le nouveau jeu
          setSelectedGameName(selectedGameObj.title);
          setError(null); // Réinitialiser les erreurs précédentes
        } else {
          setError(
            response.message ||
              "Une erreur s'est produite lors de la récupération des rangs du jeu."
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des rangs:", error);
      setError(
        "Une erreur s'est produite lors de la récupération des rangs du jeu."
      );
    }
  };

 const handleUpdateRank = async () => {
  try {
    console.log("Selected Game:", selectedGame);
    console.log("Selected Rank:", selectedRank);
    console.log("Game List:", gameList);
    console.log("Game Ranks:", gameRanks);

    if (!selectedGame || selectedGame === "" || !selectedRank || selectedRank === "") {
      setError("Veuillez sélectionner un jeu et un rang");
      return;
    }

    // Récupérer le nom du jeu sélectionné
    const selectedGameObj = gameList.find(game => game.id.toString() === selectedGame.toString());
    const selectedRankObj = gameRanks.find(rank => rank.id.toString() === selectedRank.toString());

    console.log("Selected Game Object:", selectedGameObj);
    console.log("Selected Rank Object:", selectedRankObj);

    if (!selectedGameObj || !selectedRankObj) {
      setError("Erreur lors de la récupération des informations du jeu ou du rang");
      return;
    }

    // Appeler l'API pour mettre à jour le rang
    const response = await UserAPI.updateRankUser({
      userId: userData.id,
      rankId: selectedRank,
    });

    // Mettre à jour le state Redux
    dispatch(updateUserRank({
      userId: userData.id,
      updatedRank: selectedRankObj.name,
      gameName: selectedGameObj.title
    }));

    // Rafraîchir la liste des rangs
    await fetchUserRanks(userData.id);

    // Réinitialiser les sélections
    setSelectedGame("");
    setSelectedRank("");
    setSelectedGameName("Sélectionnez un jeu");
    setError(null);

  } catch (error) {
    console.error("Erreur lors de la mise à jour du rang:", error);
    setError("Une erreur est survenue lors de la mise à jour du rang");
  }
};
  const handleUpdate = async () => {
    try {
      // Appeler l'API pour mettre à jour la bio
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}app/user/${userData.id}`,
        data: { bio },
      });

      // Mettre à jour le state Redux avec toutes les données de l'utilisateur
      dispatch(setUser({
        ...userData,
        bio: bio
      }));

      // Réinitialiser le formulaire
      setUpdateForm(false);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la bio:", error);
      setError("Une erreur est survenue lors de la mise à jour de la bio");
    }
  };
  return (
    <div className="profil-container">
      <h1>Profil de {userData.username}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          {userData.picture && (
            <img 
              src={userData.picture.startsWith("http") ? userData.picture : `./.${userData.picture}`} 
              alt="user-pic" 
              className="profile-pic"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "./uploads/profil/random-user.png";
              }}
            />
          )}
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {!updateForm ? (
              <>
                <p className="bio-text" onClick={() => setUpdateForm(!updateForm)}>
                  {userData.bio || "Aucune bio pour le moment. Cliquez pour en ajouter une."}
                </p>
                <button className="update-profil-btn" onClick={() => {
                  setBio(userData.bio || "");
                  setUpdateForm(true);
                }}>
                  Modifier bio
                </button>
              </>
            ) : (
              <>
                <textarea
                  className="bio-textarea"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button className="update-profil-btn" onClick={handleUpdate}>
                  Valider modifications
                </button>
                <button
                  className="update-profil-btn"
                  onClick={() => {
                    setUpdateForm(false);
                    setBio(userData.bio || "");
                  }}
                >
                  Annuler
                </button>
              </>
            )}
          </div>
          <div className="date-container">
            <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          </div>
        </div>
        <div className="profil-container">
          {/* Autres éléments */}
          <div className="game-rank-update">
            <h3>Choasissez un jeu et un rang</h3>
            <div className="game-selector">
              <select
                value={selectedGame}
                onChange={(e) => handleGameChange(e.target.value)}
              >
                <option value="">{selectedGameName}</option>
                {gameList.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="rank-selector">
              <select
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
              >
                <option value="">Sélectionnez un rang</option>
                {gameRanks.map((rank) => (
                  <option key={rank.id} value={rank.id}>
                    {rank.name}
                  </option>
                ))}
              </select>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
          <button className="update-profil-btn" onClick={handleUpdateRank}>
            Valider modifications
          </button>
        </div>

        <div className="user-ranks">
          <h3>Rangs du joueur :</h3>
          <ul>
            {userRanks.map((data, index) => (
              <li key={index}>
                {data.game} - {data.rank}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
