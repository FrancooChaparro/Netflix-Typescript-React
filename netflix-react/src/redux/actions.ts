import axios, { AxiosResponse }  from "axios";
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

interface usuario {
      username: string;
      email: string;
    }

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const GET_MOVIES = 'GET_MOVIES';
export const USER_ACTIVE = 'USER_ACTIVE';



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


export interface UserActive extends Action {
  type: typeof USER_ACTIVE;
  payload: any;
}



export const GetMovies = async ():  Promise<{ type: string; payload: any }> => {
  const res = await axios("http://localhost:3001/allMovies")
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


export const UserActive = (user: usuario): UserActive => {
  return {
    type: USER_ACTIVE,
    payload: user,
  };
};
