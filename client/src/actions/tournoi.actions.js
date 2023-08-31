import axios from "axios";

export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export class TournoiAPI {
  static async fetchAll() {
    return (
      await axios.get(`${process.env.REACT_APP_API_URL}app/tournois/all`)
    ).data.map(this.formatId);
  }
  static async create(tournoi) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/tournoi/tournoicreation`, tournoi)).data;
   
  }
  static async updateTournoi(tournoi) {
    return (await axios.put(`${process.env.REACT_APP_API_URL}app/tournoi/${tournoi.id}`, tournoi)).data;
   
  }
  static async updateImgTournoi(tournoi, data) {
    console.log("Data to be uploaded:", data);
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/tournoi/${tournoi.id}`, data)).data;
  }

  static formatId(tournoi) {
    return {
      ...tournoi,
      id: tournoi.id.toString(),
    };
  }
}
export const uploadPictureTournoi = (data, tournoiId) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}app/tournoi`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}app/tournoi/${tournoiId}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};