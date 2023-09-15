import axios from "axios";

export class JeuAPI {
  static async create(jeu) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/jeu/jeucreation`, jeu)).data;
   
  }
  static async fetchAll() {
    return (await axios.get(`${process.env.REACT_APP_API_URL}app/jeux/all`)).data.map(this.formatId);
   
    // .data.map(this.formatId);
  }

  static async fetchById(jeuId) {
    return this.formatId((await axios.get(`${process.env.REACT_APP_API_URL}/${jeuId}`)).data);
  }
  static async deleteById(jeuId) {
    return (await axios.delete(`${process.env.REACT_APP_API_URL}app/jeu/${jeuId}`)).data;
  }
  static async update(jeu) {
    return (await axios.put(`${process.env.REACT_APP_API_URL}app/jeu/${jeu.id}`, jeu)).data;
  }
  static async infoGameByName(jeu) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/jeu/info`, jeu)).data;
  }
  static async infoRank(jeu) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/jeu/rank`, jeu)).data;
  }
  static async updateImgJeu(jeu) {
    return (await axios.post(`${process.env.REACT_APP_API_URL}app/jeu/upload`, jeu)).data;
  }
  static formatId(jeu) {
    return {
      ...jeu,
      id: jeu.id.toString(),
    };
  }
}

// import axios from 'axios';

// export const GET_JEU = "GET_JEU";
// export const GET_ALL_JEU = "GET_ALL_JEU";
// export const CREATE_JEU = "CREATE_JEU";

// export const getJeu = (jeuId) => {
//   return (dispatch) => {
//     return axios
//       .get(`${process.env.REACT_APP_API_URL}app/jeu/${jeuId}`)
//       .then((res) => {
//         dispatch({ type: GET_JEU, payload: res.data });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const getAllJeu = () => {
//   return (dispatch) => {
//     return axios
//       .get(`${process.env.REACT_APP_API_URL}app/jeux/all`)
//       .then((res) => {
//         dispatch({ type: GET_ALL_JEU, payload: res.data });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export  const postCreateJeu = (data) => {
//   // return (dispatch) => {
//     return axios
//       .post(`${process.env.REACT_APP_API_URL}app/jeu/jeuuptest`,data)
//       // .then((res) => {
//       //   dispatch({ type: CREATE_JEU, payload: res.data });
//       // })
//       // .catch((err) => console.log(err));
//   // };
// };

