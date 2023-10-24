import React, { useState, useEffect } from "react";
import { dateParser } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { UserAPI, updateBio, updateRank } from "../../actions/user.actions";
import { JeuAPI } from "../../actions/pjeu.actions";
import { setUserRankss,updateUserRank} from "../../store/user/user.reducer";
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

  const handleGameChange = async (selectedGameName) => {
    try {
      // Recherchez l'objet de jeu correspondant au nom du jeu sélectionné
      const selectedGame = gameList.find(
        (game) => game.id === selectedGameName
      );
      // console.log(game.name)
    
      if (selectedGame) {
        // Si le jeu est trouvé, utilisez son ID pour récupérer les rangs
        const gameId = selectedGame.id;

        // Effectue une requête au backend pour récupérer les rangs prédéfinis pour le jeu sélectionné
        const response = await JeuAPI.infoRank({ jeuId: gameId });
        if (Array.isArray(response)) {
          setGameRanks(response); // Met à jour l'état avec le tableau de noms de rangs
          setSelectedRank(""); // Réinitialise le rang sélectionné car il pourrait ne pas être valide pour le nouveau jeu
          setSelectedGameName(selectedGame.title);
        } else {
          setError(
            response.message ||
              "Une erreur s'est produite lors de la récupération des rangs du jeu."
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID du jeu :", error);
      setError(
        "Une erreur s'est produite lors de la récupération des rangs du jeu."
      );
    }
  };

 const handleUpdateRank = async () => {
  try {
    // Appeler votre API pour mettre à jour le rang de l'utilisateur
    const response = await UserAPI.updateRankUser({
      userId: userData.id,
      rankId: selectedRank,
    });

    dispatch(updateUserRank({
      userId: userData.id,
      updatedRank: response.rankName,
      gameName: response.gameName,
    }));
    // Mettre à jour le rang de l'utilisateur dans le Redux Store
    // dispatch(setUserRankss(response.userRanks));
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rang de l'utilisateur :", error);
    // Gérer l'erreur, si nécessaire
  }
};
  const handleUpdate = () => {
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  };
  return (
    <div className="profil-container">
      <h1>Profil de {userData.username}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" className="profile-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {!updateForm ? (
              <>
                <p
                  className="bio-text"
                  onClick={() => setUpdateForm(!updateForm)}
                >
                  {userData.bio}
                </p>
                <button
                  className="update-profil-btn"
                  onClick={() => setUpdateForm(true)}
                >
                  Modifier bio
                </button>
              </>
            ) : (
              <>
                <textarea
                  className="bio-textarea"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button className="update-profil-btn" onClick={handleUpdate}>
                  Valider modifications
                </button>
                <button
                  className="update-profil-btn"
                  onClick={() => setUpdateForm(false)}
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
