import { createSlice } from "@reduxjs/toolkit";
import { TournoiAPI } from "../../actions/tournoi.actions";


export const tournoiSlice = createSlice({
  name: "tournoiSlice",
  initialState: {
    tournoiList: [],
  },
  reducers: {
    setTournoiList: (currentSlice, action) => {
      currentSlice.tournoiList = action.payload;
    }, 
    updateTournoi: (currentSlice, action) => {
      const indexToUpdate = currentSlice.tournoiList.findIndex(
        (tournoi) => tournoi.id === action.payload.id
      );
      currentSlice.tournoiList[indexToUpdate] = action.payload;
    },
    addTournoi: (currentSlice, action) => {
      currentSlice.tournoiList.push(action.payload);
    },
  },
});
export const tournoiReducer = tournoiSlice.reducer;
export const { setTournoiList, addTournoi, updateTournoi } = tournoiSlice.actions;
