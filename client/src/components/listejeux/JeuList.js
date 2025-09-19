import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JeuAPI } from "../../actions/pjeu.actions";
import { UserAPI } from "../../actions/user.actions";
import { deleteJeu } from "../../store/jeu/jeu.reducer";
import HomeJeux from "./HomeJeux";

export function JeuList({ jeuList }) {
  // Utilisation du hook useDispatch pour obtenir le dispatch de Redux
  const dispatch = useDispatch();
  // Utilisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Récupération des données utilisateur
  const userData = useSelector((state) => state.USER.user);
  const [isAdmin, setIsAdmin] = useState(false);

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

  // Fonction pour supprimer le jeu
  function deleteJeu_(jeu) {
    if (window.confirm("Supprimer le jeu ?")) {
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
              onClickTrash={isAdmin ? () => deleteJeu_(jeu) : null}
              showAdminButtons={isAdmin}
            />
          </div>
        );
      })}
    </div>
  );
}
