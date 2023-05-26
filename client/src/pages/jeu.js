import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { JeuForm } from "../components/listejeux/newJeux";
import { useState } from "react";
import { JeuAPI } from "../actions/pjeu.actions";
import { TournoiAPI } from "../actions/tournoi.actions";
import { jeuReducer, updateJeu } from "../store/jeu/jeu.reducer";
import { addTournoi } from "../store/tournoi/tournois.reducer";
import { deleteJeu } from "../store/jeu/jeu.reducer";
import { BracketAPI } from "../actions/bracket.action";
// import  HomeTournois  from "../components/listetournois/hometournois"
import { TournoiList } from "../components/listetournois/TournoisList";
import { TournoiNew } from "../components/listetournois/newTournoi";
export function Jeu(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [affTournois, setAffTournois] = useState(true);
  const dispatch = useDispatch();
  const { jeuId } = useParams();
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  const jeu = useSelector((store) =>
    store.JEU.jeuList.find((jeu) => jeu.id === jeuId)
  );

  async function submit(formValues) {
    const updatedJeu = await JeuAPI.update({ ...formValues, id: jeu.id });
    dispatch(updateJeu(updatedJeu));
   
    setIsEditable(false);
  }
  // async function createBracket(formValuesTournois) {
  //   const createdBracket = await BracketAPI.create({
  //     listetournoiId: createdTournoi.id,
  //   });
  //   console.log(createdTournoi.id)  
  // }

  async function createTournoi(formValuesTournois) {
    const createdTournoi = await TournoiAPI.create({
      ...formValuesTournois,
      listejeuId: jeuId,
    });
    dispatch(addTournoi(createdTournoi));
    const createdBracket = await BracketAPI.create({
      listetournoiId: createdTournoi.id,
      
    });
    console.log(createdTournoi.id)
    setAffTournois(!affTournois)
    // console.log(createdTournoi);
    // console.log(formValuesTournois);
  }

  const ChangeAffButton = (
    <div className="nj_submit_btn">
      <button onClick={() => setAffTournois(!affTournois)}>
        Créer son tournoi
      </button>
    </div>
  );
  function deleteJeu_(jeu) {
    if (window.confirm("supprimer la note ?")) {
      JeuAPI.deleteById(jeu.id);
      dispatch(deleteJeu(jeu));
      navigate("/homeListeJeux");
    }
  }
  const tournoiList = useSelector((store) => store.TOURNOI.tournoiList);

  const filteredList = tournoiList.filter(
    (tournoi) => tournoi.listejeuId == jeuId
  );
  // console.log(affTournois);
  return (
    <>
      <div className="row justify-content-center">{ChangeAffButton}</div>
      <div className="mb-1">
        {jeu && affTournois && (
          <JeuForm
            isEditable={isEditable}
            name={isEditable ? "Edit jeu" : jeu.title}
            jeu={jeu}
            onClickEdit={() => setIsEditable(!isEditable)}
            onClickTrash={() => deleteJeu_(jeu)}
            onSubmit={isEditable && submit}
          />
        )}
      </div>
      <div className="mb-5">
        {jeu && !isEditable && !affTournois && (
          <TournoiNew  onSubmit={createTournoi} />
        )}
      </div>
      <div className="mb-5">
        {jeu && !isEditable && affTournois && (
          <TournoiList tournoiList={filteredList} />
        )}
      </div>
    </>
  );
}
export default Jeu;
