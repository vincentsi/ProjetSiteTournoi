import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import jeuReducer from './jeu.reducer';

export default combineReducers({
  userReducer,
  jeuReducer
});