
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { JeuForm } from "../components/listejeux/newJeux";
import { useState } from "react";
import { JeuAPI } from "../actions/pjeu.actions";
import { updateJeu } from "../store/jeu/jeu.reducer";
import { deleteJeu } from "../store/jeu/jeu.reducer";
// import  HomeTournois  from "../components/listetournois/hometournois"
import  { TournoiList } from "../components/listetournois/TournoisList";
export function Jeu(props) {
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const { jeuId } = useParams();
  const navigate = useNavigate()
  // const [searchParams] = useSearchParams();
  
  const jeu = useSelector((store) =>
    store.JEU.jeuList.find((jeu) => jeu.id === jeuId)
  );
  
  
  async function submit(formValues) {
    const updatedJeu = await JeuAPI.update({...formValues,id: jeu.id})
    dispatch(updateJeu(updatedJeu));
    setIsEditable(false);
  }

  function deleteJeu_(jeu){
    if (window.confirm("supprimer la note ?")){
    JeuAPI.deleteById(jeu.id)
    dispatch(deleteJeu(jeu))
    navigate("/homeListeJeux")
   }
  }
  const tournoiList =  useSelector((store) =>  store.TOURNOI.tournoiList);

 
  const filteredList = tournoiList.filter((tournoi) =>  tournoi.listejeuId == jeuId);
 
  return (
    <>
    <div className="mb-1">
      {jeu && (
        <JeuForm
          isEditable={isEditable}
          name={isEditable ? "Edit jeu" : jeu.title}
          jeu={jeu}
          onClickEdit={() => setIsEditable(!isEditable)}
          onClickTrash={() => deleteJeu_(jeu)}
          onSubmit={isEditable && submit}
        />)}
        </div>
        <div className="mb-5">
        {jeu && (<TournoiList tournoiList={filteredList} />)}
        </div>
        
    </>
  );
  
}
export default Jeu;