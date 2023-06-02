

// import { useNavigate} from "react-router-dom"
import { BracketAPI } from "../../actions/bracket.action";
import { useDispatch,useSelector } from "react-redux";
import BracketGeneration from "./bracketGeneration";
import { setMatchList } from "../../store/match/match.reducer";
import { useEffect } from "react";

export function MatchList({tournoi}) {
//   const tournoi =  useSelector((store) =>  store.TOURNOI.tournoiList);
  const dispatch = useDispatch();

async function matchC() {
    const matchList = await BracketAPI.affBracket({tournoiId: tournoi.id});
  
    dispatch(setMatchList(matchList));
  }
  useEffect(()=>{
    matchC();
  },[])
//   const match =  BracketAPI.affBracket({tournoiId: tournoi.id})
//   dispatch(setMatchList(match));
  
  const matchList =  useSelector((store) =>  store.MATCH.matchList);
// const match=matchList()
// console.log(match)
    
  return (
    <div className="row justify-content-center">
      {matchList.map((match) => {
        return (
          <div key={match.id} className="match_container">
          
            <BracketGeneration
           
              user1={match.user1}
              user2={match.user2}
              winner={match.winner}
            //   tournoiId={match.tournoiId}
            //   onClick={()=> navigate("/match/"+ match.id)}
              
            />
          </div>
        );
      })}
    </div>
  );
}
