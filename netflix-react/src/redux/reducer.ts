import { AnyAction } from "redux";
import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  GET_MOVIES,
  MOVIE_BY_NAME,
  MOVIE_FILTER
} from "./actions";
import { MovieObject, User, AppState } from "../types";


// Estado Global
const initialState: AppState = {
  user: null,
  movies: [],
  allMovies: []
};


// Exporto estados
export const UserActive = (state: AppState) => state.user;
export const Movies = (state: AppState) => state.movies;
export const movieName = (state: AppState) => state.allMovies


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
      case MOVIE_BY_NAME:   
      return { 
        ...state, 
        allMovies: action.payload
      }
      case MOVIE_FILTER: 
      return { 
        ...state, 
        allMovies: state.movies.filter(e => e.gender == action.payload)
      }
    default:
      return state;
  }
};

export default rootReducer;
