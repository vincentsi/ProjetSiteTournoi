import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { UserAPI } from "../../actions/user.actions";
import { dateParser } from "../utils";

function UserProfile() {
  const { userId } = useParams(); // ID de l'utilisateur depuis l'URL

  // const userData = useSelector((state) => state.USER.user);
  const [userRanks, setUserRanks] = useState([]);
  // stocker les données de l'utilisateur sélectionné
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // charger les données de l'utilisateur en utilisant l'ID

    const fetchSelectedUser = async () => {
      try {
        const userResponse = await UserAPI.getUser(userId);

        if (userResponse) {
          setSelectedUser(userResponse); // Mettez à jour l'état local avec les données de l'utilisateur

          // Récupérez les rangs de l'utilisateur (adaptez cette partie selon la structure des données dans votre application)
          const ranksResponse = await UserAPI.affRankUser({ userId: userId });
          if (ranksResponse) {
            setUserRanks(ranksResponse); // Mettez à jour l'état local avec les rangs de l'utilisateur
          }
        } else {
          // Gérez les erreurs si la récupération des données échoue
          console.error("Impossible de récupérer les données de l'utilisateur");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur :",
          error
        );
      }
    };

    fetchSelectedUser();
  }, [userId]);

  // Vous pouvez afficher les données de l'utilisateur dans le composant
  return (
    <div className="profil-container">
      {selectedUser ? (
        <>
          <h1>Profil de {selectedUser.username}</h1>
          <div className="update-container">
            <div className="left-part">
              <h3>Photo de profil</h3>
              <img
                src={
                  selectedUser.picture &&
                  selectedUser.picture.startsWith("http")
                    ? selectedUser.picture
                    : selectedUser.picture
                    ? selectedUser.picture
                    : "/uploads/profil/random-user.png"
                }
                alt="user-pic"
                className="profile-pic"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/uploads/profil/random-user.png";
                }}
              />
            </div>
            <div className="right-part">
              <div className="bio-update">
                <h3>Bio</h3>
                <p className="bio-text">
                  {selectedUser.bio || "Aucune bio disponible pour le moment."}
                </p>
              </div>
              <div className="date-container">
                <h4>Membre depuis le : {dateParser(selectedUser.createdAt)}</h4>
              </div>
              <div className="user-ranks">
                <h3>Rangs du joueur :</h3>
                {userRanks.length > 0 ? (
                  <ul>
                    {userRanks.map((data, index) => (
                      <li key={index}>
                        {data.game} - {data.rank}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                  >
                    Aucun rang configuré pour le moment.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            color: "white",
            fontSize: "1.2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "3px solid rgba(255,255,255,0.3)",
                borderTop: "3px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 20px",
              }}
            ></div>
            Chargement en cours...
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default UserProfile;
