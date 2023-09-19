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
export const { setUser } = userSlice.actions;

const initialState = {
  ranks: [],
  error: null,
};

const userReducer2 = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RANKS_SUCCESS':
      return {
        ...state,
        ranks: action.payload,
        error: null,
      };
    case 'GET_RANKS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer2;