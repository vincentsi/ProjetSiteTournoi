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
      const { userId, updatedRank, gameName } = action.payload;
      
      // Vérifier si le rang existe déjà pour ce jeu
      const existingRankIndex = currentSlice.userRanks.findIndex(
        rank => rank.game === gameName
      );

      if (existingRankIndex !== -1) {
        // Mettre à jour le rang existant
        currentSlice.userRanks[existingRankIndex] = {
          ...currentSlice.userRanks[existingRankIndex],
          rank: updatedRank
        };
      } else {
        // Ajouter un nouveau rang
        currentSlice.userRanks.push({
          userId,
          game: gameName,
          rank: updatedRank
        });
      }
    },
  },
});

export const { setUser, setUserRankss, updateUserRank } = userSlice.actions;
export const userReducer = userSlice.reducer;

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