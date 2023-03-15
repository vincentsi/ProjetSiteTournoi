import axios from 'axios';

export const GET_JEU = "GET_JEU";

export const getJeu = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}app/jeu/${uid}`)
      .then((res) => {
        dispatch({ type: GET_JEU, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};