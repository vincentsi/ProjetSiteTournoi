
import { configureStore } from "@reduxjs/toolkit";
import { jeuReducer } from "./jeu/jeu.reducer";
import { userReducer } from "./user/user.reducer";
export const store = configureStore({

  reducer: {
    JEU: jeuReducer,
    USER: userReducer,
  },
});
