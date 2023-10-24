import React from "react";
import { JeuForm } from "../components/listejeux/newJeux";
import { JeuAPI } from "../actions/pjeu.actions";
import {useDispatch} from "react-redux"
import { addJeu } from "../store/jeu/jeu.reducer";
import { useNavigate } from "react-router-dom";

const JeuCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function createJeu(formValues){
    const createJeu = await JeuAPI.create({...formValues});
    const idAsString = createJeu.id.toString();
    const jeuAcreer = { ...formValues, id: idAsString };
    jeuAcreer.picture = "./uploads/profil/random-user.png";
    // console.log(jeuAcreer)
    // console.log(formValues)
    // dispatch(addJeu(createJeu));
    dispatch(addJeu(jeuAcreer));
    navigate("/homeListeJeux");
  }
   
  return (
    <div>
      <JeuForm name="new game" onSubmit={createJeu} />
      
    </div>
    
  );
  
};

export default JeuCreate;