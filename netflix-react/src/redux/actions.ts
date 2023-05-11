import axios, { AxiosResponse }  from "axios";
import { Action } from 'redux';
import { LoginForm, RegisterForm, User } from "../types";

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const GET_MOVIES = 'GET_MOVIES';
export const USER_ACTIVE = 'USER_ACTIVE';


export interface RegisterUserSuccessAction extends Action {
  type: typeof REGISTER_USER_SUCCESS;
  payload: RegisterForm;
}


export interface LoginUserSuccessAction extends Action {
  type: typeof LOGIN_USER_SUCCESS;
  payload: User;
}

export interface Movies extends Action {
  type: typeof GET_MOVIES;
  payload: any;
}


export const GetMovies = async (): Promise<Movies> => {
  const res = await axios("http://localhost:3001/allMovies")
  return {
    type: GET_MOVIES,
    payload: res.data.movies,
  };
};



export const registerUserSuccess = (user: RegisterForm): RegisterUserSuccessAction => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
  };
};


export const LoginUserSuccess = (user: User): LoginUserSuccessAction => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};
