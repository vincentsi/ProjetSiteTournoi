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
  },
});

export const jeuReducer = jeuSlice.reducer;
export const { setJeuList, addJeu } = jeuSlice.actions;