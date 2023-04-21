import axios from "axios";

export class TournoiAPI {
  static async fetchAll() {
    return (
      await axios.get(`${process.env.REACT_APP_API_URL}app/tournois/all`)
    ).data.map(this.formatId);
  }

  static formatId(tournoi) {
    return {
      ...tournoi,
      id: tournoi.id.toString(),
    };
  }
}
