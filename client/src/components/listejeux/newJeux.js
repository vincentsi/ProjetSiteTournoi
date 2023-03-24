import { useState } from "react";
import { PencilFill, Trash, TrashFill } from "react-bootstrap-icons";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
export function JeuFrom({ name, onClickEdit, onClickTrash, onSubmit}) {
  
  const [formValues, setFormValues] = useState({name:"", description:""})

  function updateFormValues(e){
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  console.log(formValues)
  const actionIcons = (
    <>
      <div className="col-1">
        {onClickEdit &&<PencilFill onClick={onClickEdit} className="nj_icon"/>}
      </div>
      <div className="col-1">
      {onClickTrash && <TrashFill onClick={onClickTrash} className="nj_icon" />}
      </div>
    </>
  );

  const nameInput = (
    <>
      <label className="form-label">name</label>
      <input onChange={updateFormValues} type="text" name="name" className="form-control" />
    </>
  );

  const descriptionInput = (
    <>
      <label className="form-label">description</label>
      <textarea onChange={updateFormValues} type="text" name="description" className="form-control" row="5" />
    </>
  );

  const submitButton = (
    <div className="nj_submit_btn">
      <ButtonPrimary onClick={() => onSubmit(formValues)}>Submit</ButtonPrimary>
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
      <div className={"mb-3 nj_name_input_container"}>{nameInput}</div>
      <div className="mb-3">{descriptionInput}</div>
      {onSubmit && submitButton}
    </div>
  );
}
