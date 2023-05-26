import axios from "axios";

export class BracketAPI {

  static async create(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/bracket/createbracket`, bracket)).data;
  }
  //user_bracket add user in bracket
  static async findOne(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/searchBracket`,bracket)).data;
  }
  static async UBCreate(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/bracket/adduser`, bracket)).data;
  }
  //recherche le bracket associe a l'id du tournoi
  static async findOneUserBracket(bracket) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/searchOneUserBracket`,bracket)).data;
  }
  static formatId(bracket) {
    return {
      ...bracket,
      id: bracket.id.toString(),
    };
  }
}
