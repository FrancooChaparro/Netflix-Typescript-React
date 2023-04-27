import React, {useEffect} from 'react';
import { Navbar } from "./Navbar";
import styles from "../stylesheets/Home.module.css";
import Background from "../images/img1.jpg"
import { Landing } from './Landing';
import { GetMovies } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Movies } from '../redux/reducer';
import axios from "axios";

interface MyProps {
  movie: any,
  title: String
 }

 interface movie { 
  id: String,
  idi: Number, 
  title: String, 
  language: String,
  overview: String, 
  image: String,
  date: String, 
  background: String,
  gender: String
 }

export const Home = () => {
  const counterValue = useSelector(Movies) || [];
  const dispatch = useDispatch()
  
  const terror = counterValue.filter((movie: movie) => movie.gender === "Terror") || []
  const trending = counterValue.filter((movie: movie) => movie.gender === "Trending") || []
  const comedy = counterValue.filter((movie: movie) => movie.gender === "Comedy") || []
  const Music = counterValue.filter((movie: movie) => movie.gender === "Music") || []
  const tv = counterValue.filter((movie: movie) => movie.gender === "TV") || []


  useEffect(() => {
    const fetchData = async () => {
      const moviesAction = await GetMovies();
      dispatch(moviesAction);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <div className={styles.ContainerBackground}>
        <img src={Background} alt="logo" className={styles.background} />
      </div>
       <Landing title={"Trending Now"} movie={trending}/><br />
       <Landing title={"Music"} movie={Music}/> <br />
       <Landing title={"Comedy"} movie={comedy}/> <br />
       <Landing title={"Terror"} movie={terror}/> <br />
       <Landing title={"Programas TV"} movie={tv}/>
    </div>
  )
}
