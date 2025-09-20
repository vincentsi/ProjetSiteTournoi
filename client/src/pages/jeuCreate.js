import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JeuAPI } from "../actions/pjeu.actions";
import { JeuForm } from "../components/listejeux/newJeux";
import { addJeu } from "../store/jeu/jeu.reducer";

const JeuCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function createJeu(formValues) {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const formData = new FormData();
      formData.append("title", formValues.title);
      formData.append("description", formValues.description);
      formData.append("genres", formValues.genres);

      if (formValues.picture) {
        formData.append("picture", formValues.picture);
      }

      const createJeu = await JeuAPI.create(formData);
      const idAsString = createJeu.id.toString();
      const jeuAcreer = { ...formValues, id: idAsString };

      // Si une image a été uploadée, utiliser le chemin retourné par le serveur
      if (createJeu.picture) {
        jeuAcreer.picture = createJeu.picture;
      } else {
        jeuAcreer.picture = "/img/imagejeux/test.jpg";
      }

      dispatch(addJeu(jeuAcreer));
      setSuccessMessage("Jeu créé avec succès !");

      // Rediriger après 2 secondes
      setTimeout(() => {
        navigate("/homeListeJeux");
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la création du jeu:", error);

      if (error.response) {
        // Erreur du serveur
        const serverError = error.response.data;
        if (serverError.message) {
          setErrorMessage(`Erreur serveur: ${serverError.message}`);
        } else if (serverError.error) {
          setErrorMessage(`Erreur: ${serverError.error}`);
        } else {
          setErrorMessage(
            `Erreur serveur (${error.response.status}): ${error.response.statusText}`
          );
        }
      } else if (error.request) {
        // Erreur de réseau
        setErrorMessage(
          "Erreur de connexion au serveur. Vérifiez votre connexion internet."
        );
      } else {
        // Autres erreurs
        setErrorMessage(`Erreur: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Éléments décoratifs en arrière-plan */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 15s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "15%",
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 25s ease-in-out infinite",
        }}
      />

      {/* Conteneur principal */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* En-tête */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "2.5rem",
              fontWeight: "700",
              margin: "0",
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(45deg, #fff, #f0f0f0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🎮 Créer un nouveau jeu
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1.1rem",
              margin: "10px 0 0 0",
              fontWeight: "300",
            }}
          >
            Ajoutez un nouveau jeu à votre plateforme de tournois
          </p>
        </div>

        {/* Messages d'erreur et succès */}
        {errorMessage && (
          <div
            style={{
              background: "rgba(220, 53, 69, 0.9)",
              color: "white",
              padding: "15px 20px",
              borderRadius: "10px",
              marginBottom: "20px",
              border: "1px solid rgba(220, 53, 69, 0.3)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(220, 53, 69, 0.2)",
            }}
          >
            <strong>⚠️ Erreur :</strong> {errorMessage}
          </div>
        )}
        {successMessage && (
          <div
            style={{
              background: "rgba(40, 167, 69, 0.9)",
              color: "white",
              padding: "15px 20px",
              borderRadius: "10px",
              marginBottom: "20px",
              border: "1px solid rgba(40, 167, 69, 0.3)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(40, 167, 69, 0.2)",
            }}
          >
            <strong>✅ Succès :</strong> {successMessage}
          </div>
        )}

        {/* Formulaire */}
        <JeuForm
          name="new game"
          onSubmit={createJeu}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* CSS pour les animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default JeuCreate;
