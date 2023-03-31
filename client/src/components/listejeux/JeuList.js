
import { useDispatch,useSelector } from "react-redux";
import { useNavigate} from "react-router-dom"

import HomeJeux from "./HomeJeux";
export function JeuList(props) {
  const dispatch = useDispatch();
  const JeuList =  useSelector((store) =>  store.JEU.jeuList);
    const navigate = useNavigate()
    console.log(JeuList)
  return (
    <div className="row justify-content-center">
      {JeuList.map((jeu) => {
        return (
          <div key={jeu.id} className="jeu_container">
            <HomeJeux
              title={jeu.title}
              subtitle={jeu.createdAt}
              description={jeu.description}
              onClick={()=> navigate("/jeu/"+ jeu.id)}
              onClickTrash={()=> alert("click trash")}
            />
          </div>
        );
      })}
    </div>
  );
}
