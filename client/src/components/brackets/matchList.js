import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BracketAPI } from "../../actions/bracket.action";
import { setMatchList } from "../../store/match/match.reducer";
import TournamentTree from "./bracketGeneration"; // Importez le composant TournamentTree ici

export function MatchList({ tournoi }) {
  const dispatch = useDispatch();

  async function matchC() {
    const matchList = await BracketAPI.affBracket({ tournoiId: tournoi.id });
    dispatch(setMatchList(matchList));
  }

  useEffect(() => {
    matchC();
  }, []);

  const matchList = useSelector((store) => store.MATCH.matchList);
console.log(matchList)

const organizedMatches = matchList.reduce((result, match) => {
  const round = match.Round;
  if (!result[round]) {
    result[round] = [];
  }
  result[round].push(match);
  return result;
}, {});

  return (
    <div className="tournament-tree">
    
      {/* Intégrez le composant TournamentTree ici */}
      <TournamentTree round={organizedMatches} />
    </div>
  );
}