import { createSlice } from "@reduxjs/toolkit";

export const matchSlice = createSlice({
  name: "matchSlice",
  initialState: {
    matchList: [],
  },
  reducers: {
    setMatchList: (currentSlice, action) => {
      currentSlice.matchList = action.payload;
    },
  },
});

export const matchReducer = matchSlice.reducer;
export const { setMatchList } = matchSlice.actions;
