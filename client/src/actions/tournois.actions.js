import axios from "axios";

export class TournoiAPI {
  static async fetchAll() {
    return (
      await axios.get(`${process.env.REACT_APP_API_URL}app/tournois/all`)
    ).data.map(this.formatId);
  }

  static formatId(jeu) {
    return {
      ...jeu,
      id: jeu.id.toString(),
    };
  }
}
