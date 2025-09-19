import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { JeuAPI } from "../actions/pjeu.actions";
import { TournoiAPI } from "../actions/tournoi.actions";
import { UserAPI } from "../actions/user.actions";
import { JeuForm } from "../components/listejeux/newJeux";
import { TournoiList } from "../components/listetournois/TournoisList";
import { TournoiNew } from "../components/listetournois/newTournoi";
import { deleteJeu, updateJeu } from "../store/jeu/jeu.reducer";
import { addTournoi } from "../store/tournoi/tournois.reducer";
const Jeu = () => {
  // Déclaration des états locaux avec le hook useState
  const userData = useSelector((state) => state.USER.user);
  const [isEditable, setIsEditable] = useState(false);
  const [affTournois, setAffTournois] = useState(true);
  const [showCreateTournoi, setShowCreateTournoi] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Utilisation du hook useDispatch pour obtenir le dispatch de Redux
  const dispatch = useDispatch();

  // Utilisation de useParams pour obtenir l'id du jeu à partir de l'URL
  const { jeuId } = useParams();

  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Récupération du jeu à partir de l'état global en utilisant useSelector de Redux
  const jeu = useSelector((store) =>
    store.JEU.jeuList.find((jeu) => jeu.id === jeuId)
  );

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (userData.id) {
        try {
          const roles = await UserAPI.getUserRoles(userData.id);
          setIsAdmin(roles.includes("admin"));
        } catch (error) {
          console.error("Erreur lors de la vérification du rôle admin:", error);
          setIsAdmin(false);
        }
      }
    };

    checkAdminRole();
  }, [userData.id]);

  // Fonction pour soumettre le formulaire de modification du jeu
  async function submit(formValues) {
    const updatedJeu = await JeuAPI.update({ ...formValues, id: jeu.id });
    dispatch(updateJeu(updatedJeu));
    setIsEditable(false); // Désactiver le mode édition après soumission
  }

  // Fonction pour créer un nouveau tournoi
  const createTournoi = async (formValuesTournois) => {
    try {
      const createdTournoi = await TournoiAPI.create({
        ...formValuesTournois,
        listejeuId: jeuId,
        userId: userData.id,
      });

      const idAsString = createdTournoi.id.toString();
      const jeuIdAsInt = parseInt(jeuId, 10);
      const tournoiAcreer = {
        ...formValuesTournois,
        id: idAsString,
        listejeuId: jeuIdAsInt,
        userId: userData.id,
      };
      tournoiAcreer.picture = "./../uploads/profil/random-user.png";
      dispatch(addTournoi(tournoiAcreer));
      setAffTournois(!affTournois); // Changer l'affichage des tournois
      // setSuccessMessage('Le tournoi a été créé avec succès!');
      window.location.href = `/jeu/${jeuId}`;
    } catch (error) {
      console.error("Erreur complète:", error);

      // Relancer l'erreur pour que le composant newTournoi.js puisse la gérer
      throw error;
    }
  };

  // Fonction pour supprimer le jeu
  function deleteJeu_(jeu) {
    if (window.confirm("Supprimer le jeu ?")) {
      JeuAPI.deleteById(jeu.id);
      dispatch(deleteJeu(jeu));
      navigate("/homeListeJeux"); // Rediriger vers la liste des jeux après suppression
    }
  }
  const [selectedPlatform, setSelectedPlatform] = useState(""); // Ajout de l'état pour la plateforme sélectionnée
  // Filtrer les tournois associés au jeu
  const tournoiList = useSelector((store) => store.TOURNOI.tournoiList);
  const filteredList = tournoiList.filter(
    (tournoi) =>
      tournoi.listejeuId === Number(jeuId) &&
      (selectedPlatform === "" || tournoi.platforme === selectedPlatform)
  );
  return (
    <div className="main_container_jeu">
      <div
        className="mb-1"
        style={{ backgroundImage: `url(./.${jeu?.picture || ""})` }}
      >
        {/* Affiche le formulaire de modification du jeu */}
        {userData.id && ( // Vérification de l'utilisateur connecté
          <div className="nj_submit_btn">
            <button onClick={() => setShowCreateTournoi(!showCreateTournoi)}>
              {showCreateTournoi
                ? `Créer son tournoi sur ${jeu?.title}`
                : `Revenir à la page de ${jeu?.title}`}
            </button>
          </div>
        )}
        {jeu && showCreateTournoi && (
          <JeuForm
            isEditable={isEditable}
            title={isEditable ? "Edit jeu" : jeu.title}
            jeu={jeu}
            onClickEdit={isAdmin ? () => setIsEditable(!isEditable) : null}
            onClickTrash={isAdmin ? () => deleteJeu_(jeu) : null}
            onSubmit={isEditable && submit}
            showAdminButtons={isAdmin}
          />
        )}
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          <option value="">Toutes les plateformes</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Xbox">Xbox</option>
          <option value="pc">pc</option>
          {/* Ajoutez d'autres options de plateforme si nécessaire */}
        </select>
      </div>
      {/* Ajout du filtre de sélection de plateforme */}

      {/* <div className="mb-5"> */}
      {/* Afficher le formulaire pour créer un nouveau tournoi */}
      {jeu && !isEditable && !showCreateTournoi && (
        <TournoiNew onSubmit={createTournoi} />
      )}
      {/* </div> */}
      <div
        className="mb-5 background-image"
        // style={{ backgroundImage: `url(./../img/homeImg/fond.jpeg)` }}
      >
        {/* Afficher la liste des tournois associés au jeu */}
        {jeu && !isEditable && showCreateTournoi && (
          <TournoiList tournoiList={filteredList} />
        )}
      </div>
    </div>
  );
};

export default Jeu;
