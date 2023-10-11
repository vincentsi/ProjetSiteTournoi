import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JeuAPI } from "../../actions/pjeu.actions";
import { deleteJeu } from "../../store/jeu/jeu.reducer";
import HomeJeux from "./HomeJeux";

export function JeuList({ jeuList }) {
  // Utilisation du hook useDispatch pour obtenir le dispatch de Redux
  const dispatch = useDispatch();
  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Fonction pour supprimer le jeu
  function deleteJeu_(jeu) {
    if (window.confirm("Supprimer la note ?")) {
      // Utilisation de l'API pour supprimer le jeu en fonction de son ID
      JeuAPI.deleteById(jeu.id);
      // Utilisation du dispatch pour supprimer le jeu de l'état global
      dispatch(deleteJeu(jeu));
    }
  }

  return (
    <div className="row justify-content-center">
      {/* Pour chaque jeu dans la liste, afficher un composant HomeJeux */}
      {jeuList.map((jeu) => {
        return (
          <div key={jeu.id} className="jeu_container">
            <HomeJeux
              title={jeu.title}
              subtitle={jeu.createdAt}
              description={jeu.description}
              picture={jeu.picture}
              // Rediriger vers la page détaillée du jeu
              onClick={() => navigate("/jeu/" + jeu.id)} 
              onClickTrash={() => deleteJeu_(jeu)} 
            />
          </div>
        );
      })}
    </div>
  );
}
