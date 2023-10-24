import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: [],
    userRanks: [],
  },
  reducers: {
    setUser: (currentSlice, action) => {
      currentSlice.user = action.payload;
    },
    setUserRankss: (currentSlice, action) => {
      currentSlice.userRanks = action.payload;
    },
    updateUserRank: (currentSlice, action) => {
      // Mettez à jour le rang de l'utilisateur dans le tableau des rangs
      const { userId, updatedRank, gameName } = action.payload;
      currentSlice.userRanks = currentSlice.userRanks.map((rank) => {
        if (rank.userId === userId) {
          return { ...rank, rank: updatedRank, game: gameName };
        }
        return rank;
      });
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser, setUserRankss, updateUserRank } = userSlice.actions;

// const initialState = {
//   ranks: [],
//   error: null,
// };

// const userReducer2 = (state = initialState, action) => {
//   switch (action.type) {
//     case 'GET_RANKS_SUCCESS':
//       return {
//         ...state,
//         ranks: action.payload,
//         error: null,
//       };
//     case 'GET_RANKS_FAILURE':
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer2;