import { useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ValidatorService } from "../../services/form-validators";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { FieldError } from "../FieldError/FieldError";

const VALIDATORS = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  description: (value) => {
    return ValidatorService.min(value, 3);
  },
  genres: (value) => {
    return value ? undefined : "Genre is required";
  },
};
export function JeuForm({
  jeu,
  isEditable = true,
  title,
  onClickEdit,
  onClickTrash,
  onSubmit,
  showAdminButtons = false,
}) {
  const [formValues, setFormValues] = useState({
    title: jeu?.title || "",
    description: jeu?.description || "",
    genres: jeu?.genres || "",
  });
  const [formErrors, setFormErrors] = useState({
    title: jeu?.title ? undefined : "",
    description: jeu?.description ? undefined : "",
    genres: jeu?.genres ? undefined : "",
  });

  function hasError() {
    return Object.values(formErrors).some((error) => error !== undefined);
  }

  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.title]: e.target.value });
    validate(e.target.title, e.target.value);
  }
  // console.log(formErrors);
  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATORS[fieldName](fieldValue),
    });
  }
  // console.log(formValues)
  const actionIcons = (
    <>
      {showAdminButtons && (
        <>
          <div className="col-1">
            {onClickEdit && (
              <button
                onClick={onClickEdit}
                className="admin-edit-btn"
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                title="Modifier le jeu"
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px) scale(1.05)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(102, 126, 234, 0.3)";
                }}
              >
                <PencilFill />
                Modifier
              </button>
            )}
          </div>
          <div className="col-1">
            {onClickTrash && (
              <button
                onClick={onClickTrash}
                className="admin-delete-btn"
                style={{
                  background: "linear-gradient(135deg, #ff4757, #ff3838)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(255, 71, 87, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                title="Supprimer le jeu"
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px) scale(1.05)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(255, 71, 87, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0) scale(1)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(255, 71, 87, 0.3)";
                }}
              >
                <TrashFill />
                Supprimer
              </button>
            )}
          </div>
        </>
      )}
    </>
  );

  const titleInput = (
    <div className="mb-5">
      <label className="form-label">title</label>
      <input
        onChange={updateFormValues}
        type="text"
        title="title"
        className="form-control"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );

  const descriptionInput = (
    <div className="mb-5">
      <label className="form-label">description</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        title="description"
        className="form-control"
        row="5"
        value={formValues.description}
      />
      <FieldError msg={formErrors.description} />
    </div>
  );

  const submitButton = (
    <div className="nj_submit_btn">
      <ButtonPrimary
        isDisabled={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );
  const genreOptions = [
    "Action",
    "Aventure",
    "Stratégie",
    "RPG",
    "Sport",
    "Simulation",
  ];

  const genreSelect = (
    <div className="mb-5">
      <label className="form-label">genres</label>
      <select
        onChange={updateFormValues}
        title="genres"
        className="form-control"
        value={formValues.genres}
      >
        <option value="">Sélectionner un genre</option>
        {genreOptions.map((genres) => (
          <option key={genres} value={genres}>
            {genres}
          </option>
        ))}
      </select>
      <FieldError msg={formErrors.genres} />
    </div>
  );
  // console.log(formValues)
  return (
    <div className="nj_container">
      <div className="row justify-description-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={"mb-3 nj_title_input_container"}>
        {isEditable && titleInput}
      </div>
      <div className="mb-3 description">
        {isEditable ? descriptionInput : <p>{jeu.description}</p>}
      </div>
      {isEditable && genreSelect}
      {onSubmit && submitButton}
    </div>
  );
}
