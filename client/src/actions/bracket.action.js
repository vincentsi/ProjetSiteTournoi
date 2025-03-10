import axios from "axios";

export class BracketAPI {
  static async UTCreate(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/bracket/adduser`, bracket)).data;
  }
  //recherche le bracket associe a l'id du tournoi
  static async findOneUserBracket(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/searchOneUserBracket`,bracket)).data;
  }
  static async DelOneUserBracket(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/bracket/deluser`,bracket)).data;
  }
  static async genereBracket(tournoiId) {
    console.log(tournoiId);
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/generateBracket`,tournoiId)).data;
  }
  static async affBracket(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/matches/all`,bracket)).data;
  }
  static async affParticipant (bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/bracket/affParticipant`,bracket)).data;
  }
  static async getUserMatches (bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/bracket/matches`,bracket)).data;
  }
  static async reportWinner (matchId,winnerId) {
    console.log(matchId,winnerId)
    return (await axios.put(`${process.env.REACT_APP_API_URL}app/bracket/reportwinner`,{
      matchId: matchId,
      winnerId: winnerId,
     
    })).data;
  }
  static async updateMatch (matchId,winnerId) {
    console.log(matchId,winnerId)
    return (await axios.put(`${process.env.REACT_APP_API_URL}app/bracket/updateMatch`,{
      matchId: matchId,
      winnerId: winnerId,
     
    })).data;
  }
  static formatId(bracket) {
    return {
      ...bracket,
      id: bracket.id.toString(),
    };
  }
}
