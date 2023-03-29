// import { GET_JEU  } from "../actions/pjeu.actions";
import { GET_ALL_JEU } from "../actions/pjeu.actions";
// import { CREATE_JEU } from "../actions/pjeu.actions";
const initialState = {};

export default function jeuReducer(state = initialState, action) {
    switch (action.type) {
        // case GET_JEU:
        //     return action.payload;
        case GET_ALL_JEU:
            return  action.payload;
        // case CREATE_JEU:
        //     return action.payload;
        default:
            return state;
    }
}