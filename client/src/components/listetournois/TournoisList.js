
// import { useDispatch,useSelector } from "react-redux";
import { useNavigate} from "react-router-dom"
import Hometournois from "./hometournois";

export function TournoiList({ tournoiList }) {
  // const dispatch = useDispatch();
  const navigate = useNavigate()
    
  return (
    <div className="row justify-content-center">
      {tournoiList.map((tournoi) => {
        return (
          <div key={tournoi.id} className="tournoi_container">
           <Hometournois 
              picture={tournoi.picture}
              title={tournoi.title}
              subtitle={tournoi.createdAt}
              nJoueur={tournoi.nJoueur}
              horaire={tournoi.horaire}
              // description={tournoi.description}
              
              onClick={()=> navigate("/tournoi/"+ tournoi.id)}
     
            />
          </div>
        );
      })}
    </div>
  );
}
