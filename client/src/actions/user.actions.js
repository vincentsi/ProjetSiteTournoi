import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
// export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_USER_RANK_REQUEST = "UPDATE_USER_RANK_REQUEST";
export const UPDATE_USER_RANK_SUCCESS = "UPDATE_USER_RANK_SUCCESS";
export const UPDATE_USER_RANK_FAILURE = "UPDATE_USER_RANK_FAILURE";

// Action Creators
export const updateUserRankRequest = () => ({
  type: UPDATE_USER_RANK_REQUEST,
});

export const updateUserRankSuccess = (rank) => ({
  type: UPDATE_USER_RANK_SUCCESS,
  payload: rank,
});

export const updateUserRankFailure = (error) => ({
  type: UPDATE_USER_RANK_FAILURE,
  payload: error,
});

export class UserAPI {
  static async getUser (uid)  {
  
    return (await axios.get(`${process.env.REACT_APP_API_URL}app/user/${uid}`)).data;
     
};
    static async updateRankUser(data) {
      console.log("Data to be uploaded:", data.userId);
      console.log("Data to be uploaded:", data.selectedRank);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}app/user/RankUser`, {
      userId: data.userId,
      rankId: data.selectedRank,
     
    });
     console.log(response)
    if (response.status !== 200) {
      throw new Error(`Erreur lors de la mise à jour du rang de l'utilisateur : ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rang de l'utilisateur :", error);
    throw error;
  }
}

}
export const updateRank = (userId, selectedRank) => {
  return async (dispatch) => {
    try {
      dispatch(updateUserRankRequest());

      // Call your API to update the user's rank
      const response = await UserAPI.updateRankUser({ userId, selectedRank });

      // Assuming your API returns the updated rank object
      const updatedRank = response.data;

      dispatch(updateUserRankSuccess(updatedRank));
    } catch (error) {
      dispatch(updateUserRankFailure(error.message));
    }
  };
};
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