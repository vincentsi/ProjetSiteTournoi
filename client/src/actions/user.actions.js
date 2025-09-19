import axios from "axios";
import { setUser } from "../store/user/user.reducer";

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
  static async getUser(uid) {
    return (await axios.get(`${process.env.REACT_APP_API_URL}app/user/${uid}`))
      .data;
  }
  static async affRankUser(userId) {
    return (
      await axios.post(
        `${process.env.REACT_APP_API_URL}app/user/infoUser`,
        userId
      )
    ).data;
  }
  static async updateRankUser(data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}app/user/RankUser`,
        {
          userId: data.userId,
          rankId: data.rankId,
          jeuId: data.jeuId,
        }
      );

      if (response.status === 200) {
        return response.data; // Vous pouvez retourner des données mises à jour si nécessaire
      } else {
        throw new Error(
          `Erreur lors de la mise à jour du rang de l'utilisateur : ${response.status}`
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du rang de l'utilisateur :",
        error
      );
      throw error;
    }
  }

  static async infoUser(userId) {
    // console.log(user)
    return (
      await axios.get(
        `${process.env.REACT_APP_API_URL}/app/user/infoUser`,
        userId
      )
    ).data;
  }

  static async getUserRoles(userId) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}app/user/${userId}/roles`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des rôles:", error);
      return [];
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

export const fetchUserRanks = (userId) => async (dispatch) => {
  try {
    const response = await UserAPI.infoRankUser(userId);
    dispatch({ type: "SET_USER_RANKS", payload: response });
  } catch (error) {
    dispatch({ type: "FETCH_USER_RANKS_FAILURE", payload: error.message });
  }
};

export const uploadPicture = (data, id) => {
  return async (dispatch) => {
    try {
      // Upload de l'image
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}app/upload`,
        data
      );

      // Récupération des données utilisateur mises à jour
      const userResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}app/user/${id}`
      );

      // Mise à jour du state Redux avec toutes les données utilisateur
      dispatch(setUser(userResponse.data));
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image:", err);
    }
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

export const getRanks = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/user/${userId}/ranks`);
    dispatch({ type: "GET_RANKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_RANKS_FAILURE", payload: error.message });
  }
};
