import axios, { AxiosResponse } from "axios";
import { Action } from "redux";
import { LoginForm, MovieObject, RegisterForm, User } from "../types";
import { type } from "os";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const GET_MOVIES = "GET_MOVIES";
export const USER_ACTIVE = "USER_ACTIVE";
export const MOVIE_BY_NAME = "MOVIE_BY_NAME";
export const MOVIE_FILTER = "MOVIE_FILTER";
export const ADD_MOVIE_LIST = "ADD_MOVIE_LIST";

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

export interface MoviesByName extends Action {
  type: typeof MOVIE_BY_NAME;
  payload: any;
}

export interface MovieFilter extends Action { 
  type: typeof MOVIE_FILTER;
  payload: string
}

// export interface AddMyList extends Action { 
//   type: typeof ADD_MOVIE_LIST;
//   payload: MovieObject
// }

export const MovieFilter = (paramsCategory: string) => { 
  return  {
    type: MOVIE_FILTER,
    payload: paramsCategory
  }
}

export const addMyList = (paramsMovie: MovieObject) => { 
  return { 
    type: ADD_MOVIE_LIST,
    payload: paramsMovie
  }
}


export const getMovieName = async (name: string): Promise<MoviesByName> => {
  let res = await axios.get(`http://localhost:3001/movie?name=${name}`);
  if (res.data.status) {
    return {
      type: MOVIE_BY_NAME,
      payload: res.data.result,
    };
  } else {
    return {
      type: MOVIE_BY_NAME,
      payload: [],
    };
  }
};
export const GetMovies = async (): Promise<Movies> => {
  const res = await axios("http://localhost:3001/allMovies");
  return {
    type: GET_MOVIES,
    payload: res.data.movies,
  };
};

export const registerUserSuccess = (
  user: RegisterForm
): RegisterUserSuccessAction => {
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
