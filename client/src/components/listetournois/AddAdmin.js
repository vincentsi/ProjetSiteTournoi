import React, { useState } from "react";
import { TournoiAPI } from "../../actions/tournoi.actions";


function AddAdminToTournament({ tournoiId }) {
  const [username, setUsername] = useState(""); 
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null);
  const handleAddAdmin = async () => {
    try {
     
      await TournoiAPI.addAdmin({ tournoiId, username });

      // Réinitialisez le champ de saisie après avoir ajouté l'administrateur
      setUsername("");
      setSuccessMessage("L'administrateur a été ajouté avec succès.");

      setError(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'administrateur", error);

      setError(error.response.data.message);

      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Ajouter un administrateur au tournoi</h2>
      <label>Nom d'utilisateur de l'administrateur à ajouter:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleAddAdmin}>Ajouter en tant qu'administrateur</button>
      {error && <div className="error-message-addAdmin">{error}</div>}
      {successMessage && <div className="success-message-addAdmin">{successMessage}</div>} {/* Afficher le message de succès */}

    </div>
  );
}

export default AddAdminToTournament;