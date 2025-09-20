import axios from "axios";

export class JeuAPI {
  static async create(jeu) {
    const config = {
      headers: {
        "Content-Type":
          jeu instanceof FormData ? "multipart/form-data" : "application/json",
      },
      withCredentials: true, // Important: pour envoyer les cookies
    };
    return (
      await axios.post(
        `${process.env.REACT_APP_API_URL}app/jeu/jeucreation`,
        jeu,
        config
      )
    ).data;
  }
  static async fetchAll() {
    return (
      await axios.get(`${process.env.REACT_APP_API_URL}app/jeux/all`)
    ).data.map(this.formatId);

    // .data.map(this.formatId);
  }

  static async fetchById(jeuId) {
    return this.formatId(
      (await axios.get(`${process.env.REACT_APP_API_URL}/${jeuId}`)).data
    );
  }
  static async deleteById(jeuId) {
    const config = {
      withCredentials: true,
    };
    return (
      await axios.delete(
        `${process.env.REACT_APP_API_URL}app/jeu/${jeuId}`,
        config
      )
    ).data;
  }
  static async update(jeu, id = null) {
    const config = {
      withCredentials: true,
    };

    // Si jeu est une instance de FormData, c'est un upload d'image
    if (jeu instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
      return (
        await axios.put(
          `${process.env.REACT_APP_API_URL}app/jeu/${id}`,
          jeu,
          config
        )
      ).data;
    } else {
      // Sinon, c'est une mise à jour normale
      return (
        await axios.put(
          `${process.env.REACT_APP_API_URL}app/jeu/${jeu.id}`,
          jeu,
          config
        )
      ).data;
    }
  }
  static async infoGameByName(jeu) {
    return (
      await axios.post(`${process.env.REACT_APP_API_URL}app/jeu/info`, jeu)
    ).data;
  }
  static async infoRank(jeu) {
    return (
      await axios.post(`${process.env.REACT_APP_API_URL}app/jeu/rank`, jeu)
    ).data;
  }
  static async updateImgJeu(jeu) {
    return (
      await axios.post(`${process.env.REACT_APP_API_URL}app/jeu/upload`, jeu)
    ).data;
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
