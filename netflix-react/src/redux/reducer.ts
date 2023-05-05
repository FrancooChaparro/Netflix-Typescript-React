import { AnyAction } from "redux";
import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  GET_MOVIES
} from "./actions";
import { MovieObject, User, AppState } from "../types";


// Estado Global
const initialState: AppState = {
  user: null,
  movies: [],
};


// Exporto estados
export const UserActive = (state: AppState) => state.user;
export const Movies = (state: AppState) => state.movies;


// Reducer
const rootReducer = (state = initialState, action: AnyAction): AppState => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS:  
      return {
        ...state,
        user: action.payload,
      };
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
