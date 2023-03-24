import React from "react";
import { JeuFrom } from "../components/listejeux/newJeux";
import { postCreateJeu, CREATE_JEU } from "../actions/pjeu.actions";
import {useDispatch} from "react-redux"

const JeuCreate = () => {
  // const dispatch = useDispatch();
    function addJeu(formValues){
       const creeJeu =  postCreateJeu({
            ...formValues
        });
        // dispatch(CREATE_JEU(creeJeu));
        console.log(creeJeu)
    }
  return (
    <div>
      <JeuFrom title="Create a note" onSubmit={addJeu} />
      
    </div>
    
  );
  
};

export default JeuCreate;