import React from "react";
import { JeuForm } from "../components/listejeux/newJeux";
import { JeuAPI } from "../actions/pjeu.actions";
import {useDispatch} from "react-redux"
import { addJeu } from "../store/jeu/jeu.reducer";
import { useNavigate } from "react-router-dom";
// http://localhost:3000/tournoi/13
const JeuCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function createJeu(formValues){
    const createJeu = await JeuAPI.create({
        ...formValues,
        // created_at: new Date().toLocaleDateString(),
     
    });
    console.log(createJeu)
    console.log(formValues)
    // dispatch(addJeu(createJeu));
    dispatch(addJeu(formValues));
    navigate("/homeListeJeux");
  }
   
  return (
    <div>
      <JeuForm name="new game" onSubmit={createJeu} />
      
    </div>
    
  );
  
};

export default JeuCreate;