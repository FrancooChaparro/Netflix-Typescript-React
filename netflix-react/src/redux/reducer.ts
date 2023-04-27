import { AnyAction } from 'redux';
import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, GET_MOVIES } from "./actions"


interface User {
  username: string;
  email: string;
  password: string;
}

interface AppState {
  user: User | null;
  movies: []
}

const initialState: AppState = {
  user: null,
  movies: []
};
  
export const selectCounterValue = (state: AppState) => state.user;
export const Movies = (state: AppState) => state.movies;


  const rootReducer =  (state = initialState, action: AnyAction): AppState  => {
    console.log(action, "preciso");
    
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
            const res = action.payload.data.movies
            return { 
              ...state, 
              movies: res
            }
      default:
        return state;
    }
  };
  
  export default rootReducer;
  