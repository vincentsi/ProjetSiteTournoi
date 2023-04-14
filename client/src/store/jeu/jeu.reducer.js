import { createSlice } from "@reduxjs/toolkit";

export const jeuSlice = createSlice({
  name: "jeuSlice",
  initialState: {
    jeuList: [],
  },
  reducers: {
    setJeuList: (currentSlice, action) => {
      currentSlice.jeuList = action.payload;
    },
    addJeu: (currentSlice, action) => {
      currentSlice.jeuList.push(action.payload);
    },
    updateJeu: (currentSlice, action) => {
      const indexToUpdate = currentSlice.jeuList.findIndex(
        (jeu) => jeu.id === action.payload.id
      );
      currentSlice.jeuList[indexToUpdate] = action.payload;
    },
    deleteJeu: (currentSlice, action) => {
      const filteredJeuList = currentSlice.jeuList.filter(
        (jeu) => jeu.id !== action.payload.id
      );
      currentSlice.jeuList = filteredJeuList;
    },
  },
});

export const jeuReducer = jeuSlice.reducer;
export const { setJeuList, addJeu, updateJeu ,deleteJeu } = jeuSlice.actions;
