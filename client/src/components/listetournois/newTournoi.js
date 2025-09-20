// import { useNavigate } from "react-router-dom";
// import Hometournois from "./hometournois";
import { useState } from "react";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";

export function TournoiNew({ affTournois = true, onSubmit }) {
  const [button, setButton] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formValuesTournois, setFormValuesTounois] = useState({
    title: "",
    information: "",
    prix: "",
    horaire: "",
    contact: "",
    regle: "",
    nJoueur: "",
    platforme: "",
  });

  function updateFormValuesTournois(e) {
    setFormValuesTounois({
      ...formValuesTournois,
      [e.target.name]: e.target.value,
    });
    // validate(e.target.name, e.target.value);
  }
  // console.log(formValuesTournois);
  // const [formErrors, setFormErrors] = useState({
  //   name: jeu?.name ? undefined : "",
  //   description: jeu?.description ? undefined : "",
  // });

  //   function hasError() {
  //     return Object.values(formErrors).some((error) => error !== undefined);
  //   }

  const titleInput = (
    <>
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValuesTournois}
        type="text"
        name="title"
        className="form-control"
        value={formValuesTournois.title}
      />
    </>
  );
  const prixInput = (
    <>
      <label className="form-label">Prix</label>
      <input
        onChange={updateFormValuesTournois}
        type="text"
        name="prix"
        className="form-control"
        value={formValuesTournois.prix}
      />
    </>
  );

  const numberPlayerInput = (
    <>
      <label className="form-label">Nombre de joueurs *</label>
      <select
        onChange={updateFormValuesTournois}
        name="nJoueur"
        id="nJoueur"
        className="form-control"
        value={formValuesTournois.nJoueur}
      >
        <option value="">Sélectionner le nombre de joueurs</option>
        <option value="4">4 joueurs</option>
        <option value="8">8 joueurs</option>
        <option value="16">16 joueurs</option>
        <option value="32">32 joueurs</option>
        <option value="64">64 joueurs</option>
      </select>
    </>
  );
  const contactInput = (
    <>
      <label className="form-label">Contact</label>
      <input
        onChange={updateFormValuesTournois}
        value={formValuesTournois.contact}
        type="text"
        name="contact"
        className="form-control"
      />
    </>
  );
  const horaireInput = (
    <>
      <label className="form-label">horaire</label>
      <input
        onChange={updateFormValuesTournois}
        type="text"
        name="horaire"
        className="form-control"
        value={formValuesTournois.horaire}
      />
    </>
  );
  const informationInput = (
    <>
      <label className="form-label">information</label>
      <textarea
        onChange={updateFormValuesTournois}
        value={formValuesTournois.information}
        type="text"
        name="information"
        className="form-control"
        row="5"
      />
    </>
  );
  const regleInput = (
    <>
      <label className="form-label">regle</label>
      <input
        type="text"
        name="regle"
        className="form-control"
        value={formValuesTournois.regle}
        onChange={updateFormValuesTournois}
      />
    </>
  );

  const platformeInput = (
    <>
      <label className="form-label">Plateforme</label>
      <select
        name="platforme"
        className="form-control"
        value={formValuesTournois.platforme}
        onChange={updateFormValuesTournois}
      >
        <option value="">Sélectionner une plateforme</option>
        <option value="PC">PC</option>
        <option value="PC/Console">PC/Console</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="Multi">Multi</option>
      </select>
    </>
  );
  const validateForm = () => {
    const errors = [];

    if (!formValuesTournois.title.trim()) {
      errors.push("Le titre est requis");
    }

    if (!formValuesTournois.information.trim()) {
      errors.push("L'information est requise");
    }

    if (!formValuesTournois.horaire.trim()) {
      errors.push("L'horaire est requis");
    }

    if (!formValuesTournois.prix.trim()) {
      errors.push("Le prix est requis");
    }

    if (!formValuesTournois.contact.trim()) {
      errors.push("Le contact est requis");
    }

    if (!formValuesTournois.regle.trim()) {
      errors.push("Les règles sont requises");
    }

    if (!formValuesTournois.nJoueur || formValuesTournois.nJoueur === "") {
      errors.push("Veuillez sélectionner le nombre de joueurs");
    } else if (
      isNaN(formValuesTournois.nJoueur) ||
      parseInt(formValuesTournois.nJoueur) <= 0
    ) {
      errors.push("Le nombre de joueurs doit être un nombre positif");
    } else {
      // Validation des nombres de joueurs autorisés (puissances de 2)
      const validPlayerCounts = [4, 8, 16, 32, 64];
      const nJoueur = parseInt(formValuesTournois.nJoueur);
      if (!validPlayerCounts.includes(nJoueur)) {
        errors.push(
          `Le nombre de joueurs doit être une puissance de 2 (4, 8, 16, 32, ou 64). Vous avez sélectionné ${nJoueur}.`
        );
      }
    }

    if (!formValuesTournois.platforme) {
      errors.push("Veuillez sélectionner une plateforme");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();

    if (errors.length > 0) {
      setErrorMessage(errors.join(". "));
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    try {
      console.log("Tentative de création du tournoi...");
      await onSubmit(formValuesTournois);
      console.log("Tournoi créé avec succès !");
      setSuccessMessage("✅ Tournoi créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du tournoi:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);

      let errorMessage =
        "Une erreur est survenue lors de la création du tournoi.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.log("Message d'erreur à afficher:", errorMessage);
      setErrorMessage(errorMessage);

      // Forcer l'affichage du message d'erreur
      setTimeout(() => {
        console.log("État errorMessage après setErrorMessage:", errorMessage);
      }, 100);
    }
  };

  const submitButton = (
    <div className="nj_submit_btn">
      <ButtonPrimary onClick={handleSubmit}>Submit</ButtonPrimary>
    </div>
  );
  // console.log(affTournois);

  console.log(
    "État des messages - errorMessage:",
    errorMessage,
    "successMessage:",
    successMessage
  );

  return (
    <div className="tounois-selected-container">
      <div className="tounois-selected-header">
        <div className="row">
          <div className="col-4">tournoi picture</div>
          <div className="col-4">
            {titleInput} {numberPlayerInput}
          </div>
          <div className="col-4">tournoi inscription</div>
        </div>
      </div>
      {/* <div className="tounois-selected-bas"> */}
      <div className="All-button">
        <div className="space-all-button">
          <input
            type="button"
            value="information"
            onClick={(e) => setButton(e.target.value)}
            id="information"
            name="information"
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="participants"
            id="participants"
            name="participants"
            onClick={(e) => setButton(e.target.value)}
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="régles"
            onClick={(e) => setButton(e.target.value)}
            id="régles"
            name="régles"
          />
        </div>
        <div className="space-all-button">
          <input
            type="button"
            value="brackets"
            onClick={(e) => setButton(e.target.value)}
            id="brackets"
            name="brackets"
          />
        </div>
      </div>
      <div className="tounois-selected-bas">
        <div className="information-tournoi">
          {button === "information" && (
            <>
              <div className="col-8">{informationInput}</div>
              <div className="col-4 creationtournois_information">
                {horaireInput}
                {prixInput}
                {contactInput}
                {platformeInput}
              </div>
            </>
          )}
        </div>
        <div className="participants-tournoi">
          {button === "participants" && <>Affiche la liste des participants</>}
        </div>
        <div className="regles-tournoi">
          {button === "régles" && <> {regleInput}</>}
        </div>
        <div className="brackets-tournoi">
          {button === "brackets" && <>Affiche le brackets </>}
        </div>
        {submitButton}

        {errorMessage && (
          <div
            className="error-message"
            style={{
              backgroundColor: "#ff4757",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              margin: "20px 0",
              border: "2px solid #ff3838",
              boxShadow: "0 4px 15px rgba(255, 71, 87, 0.3)",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            className="success-message"
            style={{
              backgroundColor: "#2ed573",
              color: "white",
              padding: "15px",
              borderRadius: "8px",
              margin: "20px 0",
              border: "2px solid #20bf6b",
              boxShadow: "0 4px 15px rgba(46, 213, 115, 0.3)",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            ✅ {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
