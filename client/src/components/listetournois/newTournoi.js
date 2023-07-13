import { useNavigate } from "react-router-dom";
import Hometournois from "./hometournois";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { useState } from "react";


export function TournoiNew({ affTournois = true, onSubmit }) {
  const [button, setButton] = useState("");

  const [formValuesTournois, setFormValuesTounois] = useState({
    title: "",
    information: "",
    prix: "",
    horaire: "",
    contact: "",
    regle: "",
    nJoueur:"",
  });

  function updateFormValuesTournois(e) {
    setFormValuesTounois({
      ...formValuesTournois,
      [e.target.name]: e.target.value,
    });
    // validate(e.target.name, e.target.value);
  }
  console.log(formValuesTournois);
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
      />
    </>
  );

  const numberPlayerInput = (
    <>
      <label className="form-label">Nombre de joueur</label>
      <select  onChange={updateFormValuesTournois} name="nJoueur" id="nJoueur">
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="32">32</option>
        
      </select>
    </>
  );
  const contactInput = (
    <>
      <label className="form-label">Contact</label>
      <input
        onChange={updateFormValuesTournois}
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
      />
    </>
  );
  const informationInput = (
    <>
      <label className="form-label">information</label>
      <textarea
        onChange={updateFormValuesTournois}
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
        onChange={updateFormValuesTournois}
      />
    </>
  );
  const submitButton = (
    <div className="nj_submit_btn">
      <ButtonPrimary
        // isDisabled={hasError()}
        onClick={() => onSubmit(formValuesTournois)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );
  console.log(affTournois);
  return (
    <div className="tounois-selected-container">
      <div className="tounois-selected-header">
        <div className="row">
          <div className="col-4">tournoi picture</div>
          <div className="col-4">{titleInput} {numberPlayerInput}</div>
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
      </div>
    </div>
  );
}
