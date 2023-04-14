import { useState } from "react";
import { PencilFill, Trash, TrashFill } from "react-bootstrap-icons";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { ValidatorService } from "../../services/form-validators";
import { FieldError } from "../FieldError/FieldError";

const VALIDATORS = {
  name: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  description: (value) => {
    return ValidatorService.min(value, 3);
  },
};
export function JeuForm({
  jeu,
  isEditable = true,
  name,
  onClickEdit,
  onClickTrash,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState({
    name: jeu?.name || "",
    description: jeu?.description || "",
  });
  const [formErrors, setFormErrors] = useState({
    name: jeu?.name ? undefined : "",
    description: jeu?.description ? undefined : "",
  });

  function hasError() {
    return Object.values(formErrors).some((error) => error !== undefined);
  }

  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    validate(e.target.name, e.target.value);
  }
  console.log(formErrors);
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

  const nameInput = (
    <div className="mb-5">
      <label className="form-label">name</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="name"
        className="form-control"
        value={formValues.name}
      />
      <FieldError msg={formErrors.name} />
    </div>
  );

  const descriptionInput = (
    <div className="mb-5">
      <label className="form-label">description</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="description"
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

  return (
    <div className="nj_container">
      <div className="row justify-description-space-between">
        <div className="col-10">
          <h2 className="mb-3">{name}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={"mb-3 nj_name_input_container"}>
        {isEditable && nameInput}
      </div>
      <div className="mb-3">
        {isEditable ? descriptionInput : <pre>{jeu.description}</pre>}
      </div>
      {onSubmit && submitButton}
    </div>
  );
}
