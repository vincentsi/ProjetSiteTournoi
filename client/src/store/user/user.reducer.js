import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: [],
  },
  reducers: {
    setUser: (currentSlice, action) => {
      currentSlice.user = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser} = userSlice.actions;