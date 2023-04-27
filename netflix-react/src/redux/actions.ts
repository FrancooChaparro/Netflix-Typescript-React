// import axios, { AxiosResponse }  from "axios";
// import { Dispatch, Action, AnyAction } from "redux";
// import { RegisterForm } from "../types";
// export const USER_ACTIVE = "USER_ACTIVE";


// interface FormState { 
//     inputValues: RegisterForm
//   }

// interface User {
//   username: string;
//   email: string;
//   password: string;
// }

// type AnyActionn = /*unresolved*/ any



  
// const userRegister = async (payload: User) => {
//     const response = await axios.post('http://localhost:3001/users', payload);
//     return response;
//   };
  
//   export const registerUser = (payload: User): AnyAction => {
//     return async (dispatch: Dispatch<Action>) => {
//       try {
//         const response = await axios.post('http://localhost:3001/users', payload);
//         dispatch({ type: 'REGISTER_USER', payload: response });
//         return { type: 'REGISTER_USER_SUCCESS', payload: response };
//       } catch (error) {
//         // Manejar el error aquí si es necesario
//         console.log(error);
//         return { type: 'REGISTER_USER_FAILURE', payload: error };
//       }
//     };
//   };
import axios from "axios";
import { Action, Dispatch , AnyAction } from 'redux';

interface User {
       username: string;
       email: string;
       password: string;
     }

     interface UserLogin {
      email: string;
      password: string;
    }

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const GET_MOVIES = 'GET_MOVIES';



export interface RegisterUserSuccessAction extends Action {
  type: typeof REGISTER_USER_SUCCESS;
  payload: User;
}


export interface LoginUserSuccessAction extends Action {
  type: typeof LOGIN_USER_SUCCESS;
  payload: UserLogin;
}

export interface Movies extends Action {
  type: typeof GET_MOVIES;
  payload: any;
}


export const GetMovies = async ():  Promise<{ type: string; payload: any }> => {
  const res = await axios("http://localhost:3001/userss")
  return {
    type: GET_MOVIES,
    payload: res,
  };
};



export const registerUserSuccess = (user: User): RegisterUserSuccessAction => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
  };
};


export const LoginUserSuccess = (user: UserLogin): LoginUserSuccessAction => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};


