import { AnyAction } from 'redux';
import { REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS } from "./actions"


interface User {
  username: string;
  email: string;
  password: string;
}

interface AppState {
  user: User | null;
}

const initialState: AppState = {
  user: null,
};
  
export const selectCounterValue = (state: AppState) => state.user;


  const rootReducer =  (state = initialState, action: AnyAction): AppState  => {
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
      default:
        return state;
    }
  };
  
  export default rootReducer;
  