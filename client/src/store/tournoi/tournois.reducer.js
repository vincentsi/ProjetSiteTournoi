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
// export const uploadTournoiPicture = ({ tournoiId, data }) => async (dispatch) => {
//   try {
//     // Appeler votre API pour l'upload de l'image du tournoi
//     console.log(data)
//     const response = await TournoiAPI.updateImgTournoi(tournoiId, data);
    
//     // Mettre à jour les détails du tournoi dans le store après l'upload
//     dispatch(updateTournoi(response));
//   } catch (error) {
//     console.error("Erreur lors de l'upload de l'image du tournoi :", error);
//   }
// };
export const tournoiReducer = tournoiSlice.reducer;
export const { setTournoiList, addTournoi, updateTournoi } = tournoiSlice.actions;
