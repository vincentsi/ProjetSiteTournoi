import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { JeuForm } from "../components/listejeux/newJeux";
import { JeuAPI } from "../actions/pjeu.actions";
import { TournoiAPI } from "../actions/tournoi.actions";
import { updateJeu, deleteJeu } from "../store/jeu/jeu.reducer";
import { addTournoi } from "../store/tournoi/tournois.reducer";
import { TournoiList } from "../components/listetournois/TournoisList";
import { TournoiNew } from "../components/listetournois/newTournoi";
const Jeu = () => {

  // Déclaration des états locaux avec le hook useState
  const userData = useSelector((state) => state.USER.user);
  const [isEditable, setIsEditable] = useState(false);
  const [affTournois, setAffTournois] = useState(true);
  const [showCreateTournoi, setShowCreateTournoi] = useState(true);

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

  // Fonction pour soumettre le formulaire de modification du jeu
  async function submit(formValues) {
    const updatedJeu = await JeuAPI.update({ ...formValues, id: jeu.id });
    dispatch(updateJeu(updatedJeu));
    setIsEditable(false); // Désactiver le mode édition après soumission
  }

  // Fonction pour créer un nouveau tournoi
  async function createTournoi(formValuesTournois) {

    const createdTournoi = await TournoiAPI.create({
      ...formValuesTournois,
      listejeuId: jeuId,
      userId: userData.id,
    });
    console.log(createdTournoi);
    if (createdTournoi.message === "User has already created a tournament.") {
      alert(createdTournoi.message);
    } else {
    const idAsString = createdTournoi.id.toString();
    const jeuIdAsInt = parseInt(jeuId, 10);
    console.log(idAsString);
    const tournoiAcreer = { ...formValuesTournois, id: idAsString,listejeuId: jeuIdAsInt,userId: userData.id };
    console.log(tournoiAcreer);
    tournoiAcreer.picture = "./../uploads/profil/random-user.png";
    dispatch(addTournoi(tournoiAcreer)); // Ajouter le nouveau tournoi à l'état global
    setAffTournois(!affTournois); // Changer l'affichage des tournois
  }

  }

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
    (tournoi) => tournoi.listejeuId === Number(jeuId)&&
    (selectedPlatform === "" || tournoi.platforme === selectedPlatform)
    
  );
  return (
    <div className="main_container_jeu">
  
      <div className="mb-1" style={{ backgroundImage: `url(./.${jeu?.picture || ''})` }}>
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
            onClickEdit={() => setIsEditable(!isEditable)}
            
            onClickTrash={() => deleteJeu_(jeu)}
            onSubmit={isEditable && submit}
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
      <div className="mb-5 background-image" style={{ backgroundImage: `url(./../img/homeImg/fond.jpeg)` }}>
        {/* Afficher la liste des tournois associés au jeu */}
        {jeu && !isEditable && showCreateTournoi && (
          <TournoiList tournoiList={filteredList} />
        )}
      </div>
    </div>
  );
}

export default Jeu;
