
import { useDispatch,useSelector } from "react-redux";
import { useNavigate} from "react-router-dom"
import { JeuAPI } from "../../actions/pjeu.actions";
import { deleteJeu } from "../../store/jeu/jeu.reducer";
import HomeJeux from "./HomeJeux";

export function JeuList({ jeuList }) {
  // const JeuList =  useSelector((store) =>  store.JEU.jeuList);
  const dispatch = useDispatch();
  const navigate = useNavigate()
    
  function deleteJeu_(jeu){
    if (window.confirm("supprimer la note ?")){
    JeuAPI.deleteById(jeu.id)
    dispatch(deleteJeu(jeu))
   }
  }
  
  return (
    <div className="row justify-content-center">
      {jeuList.map((jeu) => {
        return (
          <div key={jeu.id} className="jeu_container">
            <HomeJeux
              name={jeu.name}
              subtitle={jeu.createdAt}
              description={jeu.description}
              picture={jeu.picture}
              onClick={()=> navigate("/jeu/"+ jeu.id)}
              onClickTrash={()=> deleteJeu_(jeu)}
            />
          </div>
        );
      })}
    </div>
  );
}
