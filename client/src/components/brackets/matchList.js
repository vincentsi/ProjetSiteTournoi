
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

  
  const matchList =  useSelector((store) =>  store.MATCH.matchList);


  return (
    <div className="row justify-content-center">
      {matchList?.map((match) => {
        return (
          <div key={match.id} className="match_container">
           {/* <div key={match.id} onClick={() => onMatchClick(match.id)}>
          <p>Nom du match: {match.name}</p> */}
            <BracketGeneration
              matches={match}
              user1={match.user1}
              user2={match.user2}
              winner={match.winner}
              round={match.Round}
              
            //   tournoiId={match.tournoiId}
            //   onClick={()=> navigate("/match/"+ match.id)}
              
            />
          </div>
        );
      })}
    </div>
  );
}
