import { useState } from "react";
import { PencilFill, Trash, TrashFill } from "react-bootstrap-icons";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { ValidatorService } from "../../services/form-validators";
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
      <div className="col-1">
        {onClickEdit && (
          <PencilFill onClick={onClickEdit} className="nj_icon" />
        )}
      </div>
      <div className="col-1">
        {onClickTrash && (
          <TrashFill onClick={onClickTrash} className="nj_icon" />
        )}
      </div>
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
  const genreOptions = ["Action", "Aventure", "Stratégie", "RPG", "Sport", "Simulation"];

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
