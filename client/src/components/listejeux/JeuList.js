
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import HomeJeux from "./HomeJeux";
export function JeuList(props) {
  const JeuList = useSelector((store) => store.jeuReducer);
    const navigate = useNavigate()
  return (
    <div className="row justify-content-center">
      {JeuList.map((jeu) => {
        return (
          <div key={jeu.id} className="jeu_container">
            <HomeJeux
              title={jeu.title}
              subtitle={jeu.createdAt}
              content={jeu.description}
              onClick={()=> navigate("/jeu/"+ jeu.id)}
              onClickTrash={()=> alert("click trash")}
            />
          </div>
        );
      })}
    </div>
  );
}
