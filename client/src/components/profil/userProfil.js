import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
import { UserAPI } from "../../actions/user.actions";
import { dateParser } from "../utils";

function UserProfile() {

  const { userId } = useParams(); // Récupérez l'ID de l'utilisateur depuis l'URL

  const userData = useSelector((state) => state.USER.user); // Utilisez Redux ou votre propre méthode pour obtenir les données de l'utilisateur

  // Créez un état local pour stocker les données de l'utilisateur sélectionné
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Ici, vous devrez charger les données de l'utilisateur en utilisant l'ID
    // Vous pouvez utiliser une fonction comme UserAPI pour cela
    const fetchSelectedUser = async () => {
      try {
        const response = await UserAPI.getUser(userId);
        console.log(response)
        if (response) {
          setSelectedUser(response); // Mettez à jour l'état local avec les données de l'utilisateur
        } else {
          // Gérez les erreurs si la récupération des données échoue
          console.error("Impossible de récupérer les données de l'utilisateur");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      }
    };

    fetchSelectedUser();
  }, [userId]);

  // Vous pouvez afficher les données de l'utilisateur dans le composant
  return (
    <div className="profile-container">
      {selectedUser ? (
        <>
          <h1>Profil de {selectedUser.username}</h1>
          <div className="profile-details">
            <div className="left-part">
              <h3>Photo de profil</h3>
              <img src={`./.${userData.picture}`}  alt="user-pic" className="profile-pic" />
            </div>
            <div className="right-part">
              <h3>Bio</h3>
              <p className="bio-text">{selectedUser.bio}</p>
              <div className="date-container">
                <h4>Membre depuis le : {dateParser(selectedUser.createdAt)}</h4>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default UserProfile;
