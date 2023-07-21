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

export function Jeu() {
  // Déclaration des états locaux avec le hook useState
  const [isEditable, setIsEditable] = useState(false);
  const [affTournois, setAffTournois] = useState(true);

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
    });
    dispatch(addTournoi(createdTournoi)); // Ajouter le nouveau tournoi à l'état global
    setAffTournois(!affTournois); // Changer l'affichage des tournois
  }

  // Fonction pour supprimer le jeu
  function deleteJeu_(jeu) {
    if (window.confirm("Supprimer le jeu ?")) {
      JeuAPI.deleteById(jeu.id);
      dispatch(deleteJeu(jeu));
      navigate("/homeListeJeux"); // Rediriger vers la liste des jeux après suppression
    }
  }

  // Filtrer les tournois associés au jeu
  const tournoiList = useSelector((store) => store.TOURNOI.tournoiList);
  const filteredList = tournoiList.filter(
    (tournoi) => tournoi.listejeuId === Number(jeuId)
  );

  return (
    <>
      <div className="row justify-content-center">
        {/* Bouton pour afficher/cacher la création de tournoi */}
        <div className="nj_submit_btn">
          <button onClick={() => setAffTournois(!affTournois)}>
            Créer son tournoi
          </button>
        </div>
      </div>
      <div className="mb-1">
        {/* Afficher le formulaire de modification du jeu */}
        {jeu && affTournois && (
          <JeuForm
            isEditable={isEditable}
            name={isEditable ? "Edit jeu" : jeu.title}
            jeu={jeu}
            onClickEdit={() => setIsEditable(!isEditable)}
            onClickTrash={() => deleteJeu_(jeu)}
            onSubmit={isEditable && submit}
          />
        )}
      </div>
      <div className="mb-5">
        {/* Afficher le formulaire pour créer un nouveau tournoi */}
        {jeu && !isEditable && !affTournois && (
          <TournoiNew onSubmit={createTournoi} />
        )}
      </div>
      <div className="mb-5">
        {/* Afficher la liste des tournois associés au jeu */}
        {jeu && !isEditable && affTournois && (
          <TournoiList tournoiList={filteredList} />
        )}
      </div>
    </>
  );
}

export default Jeu;
