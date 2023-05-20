import { AnyAction } from "redux";
import {
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  GET_MOVIES,
  MOVIE_BY_NAME,
  MOVIE_FILTER,
  ADD_MOVIE_LIST,
  OUT_MOVIE_LIST
} from "./actions";
import { AppState } from "../types";


// Estado Global
const initialState: AppState = {
  user: null,
  movies: [],
  allMovies: [],
  MyList: []
};


// Exporto estados
export const UserActive = (state: AppState) => state.user;
export const Movies = (state: AppState) => state.movies;
export const movieName = (state: AppState) => state.allMovies
export const myList = (state: AppState) => state.MyList;


// Reducer
const rootReducer = (state = initialState, action: AnyAction): AppState => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
      };
      case LOGIN_USER_SUCCESS:
        const userActive = action.payload;
        let UserSlag: any = null;
        
        if (userActive !== null) {
          localStorage.setItem("USUARIO", JSON.stringify(userActive));
          const storedUser = localStorage.getItem("USUARIO");
          if (typeof storedUser === "string") {
            UserSlag = JSON.parse(storedUser);
          }
        }
        return {
          ...state,
          user: UserSlag
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
        allMovies: state.movies.filter(e => e.gender === action.payload)
      }
      case ADD_MOVIE_LIST: 
      return { 
        ...state, 
        MyList: [...state.MyList, action.payload]
      }
      case OUT_MOVIE_LIST: 
      const updatedList = state.MyList.filter((movie) => movie.title !== action.payload.title);
      return { 
        ...state, 
        MyList: updatedList
      }
    default:
      return state;
  }
};

export default rootReducer;
