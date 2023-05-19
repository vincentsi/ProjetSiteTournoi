import { createSlice } from "@reduxjs/toolkit";

export const tournoiSlice = createSlice({
  name: "tournoiSlice",
  initialState: {
    tournoiList: [],
  },
  reducers: {
    setTournoiList: (currentSlice, action) => {
      currentSlice.tournoiList = action.payload;
    },
    addTournoi: (currentSlice, action) => {
      currentSlice.tournoiList.push(action.payload);
    },
  },
});

export const tournoiReducer = tournoiSlice.reducer;
export const { setTournoiList, addTournoi } = tournoiSlice.actions;
