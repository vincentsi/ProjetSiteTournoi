import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
// export const UPDATE_BIO = "UPDATE_BIO";
export class UserAPI {
  static async getUser (uid)  {
  
    return (await axios.get(`${process.env.REACT_APP_API_URL}app/user/${uid}`)).data;
     
};
}
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}app/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}app/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};


export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}app/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        // Mettez à jour le reducer avec l'utilisateur complet après la mise à jour de la bio
        dispatch({ type: "userSlice/setUser", payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};