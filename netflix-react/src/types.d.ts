export interface RegisterForm { 
    username: string
    email: string
    password: string
}

export interface User extends Omit<RegisterForm, 'password'> {}  // EMAIL Y USERNAME
export interface LoginForm extends Omit<RegisterForm, 'username'> {} //  EMAIL Y PASSWORD

export interface AppState {
    user: User | null;
    movies: Array<MovieObject>;
  }

export interface MovieObject { 
    background: string
    date: string
    gender: string
    id: string
    idi: number
    image: string,
    language: string
    overview: string
    title: string
}