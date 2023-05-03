import React, {useState, useEffect} from 'react';
import { Navbar } from "./Navbar";
import styles from "../stylesheets/Home.module.css";
import Background from "../images/img1.jpg"
import { Landing } from './Landing';
import { GetMovies } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Movies, selectCounterValue } from '../redux/reducer';
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
  background: string,
  gender: String
 }

export const Home = () => {
  const counterValue = useSelector(Movies) || [];
  const dispatch = useDispatch()
  const [num, setNum] = useState<number>(0);
  const terror = counterValue.filter((movie: movie) => movie.gender === "Terror") || Array<movie>
  const trending = counterValue.filter((movie: movie) => movie.gender === "Trending") || Array<movie>
  const comedy = counterValue.filter((movie: movie) => movie.gender === "Comedy") || Array<movie>
  const Music = counterValue.filter((movie: movie) => movie.gender === "Music") || Array<movie>
  const tv = counterValue.filter((movie: movie) => movie.gender === "TV") || Array<movie>
  const [loading, setLoading] = useState<boolean>(true);


console.log(loading, "loading");


useEffect(()=> { 
  setTimeout(()=> { 
    setLoading(false)
  },100)
},[])


  useEffect(() => {

    const fetchData = async () => {
      const moviesAction = await GetMovies();
      dispatch(moviesAction);
    };
    fetchData();
  }, [dispatch]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(num);
      
      if(num > 19) setNum(0)
      else setNum(num => num + 1);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  const cartelera: movie = terror[num]

  return (
    <div className={styles.homeContainer}>
      <Navbar />
   {loading ? <div className={styles.center}><div className={styles.spinner}></div></div>  :  <div className={styles.ContainerBackground}>
    <img src={cartelera?.background} alt="logo" className={styles.background}/> 
        <div className={styles.containerData}>
          <p className={styles.title}>{cartelera?.title}</p>
          <p className={styles.description}>{cartelera?.overview}</p>
        </div> 
      </div>}
       <Landing title={"Trending Now"} movie={trending}/><br />
       <Landing title={"Music"} movie={Music}/> <br />
       <Landing title={"Comedy"} movie={comedy}/> <br />
       <Landing title={"Terror"} movie={terror}/> <br />
       <Landing title={"Programas TV"} movie={tv}/>
    </div>
  )
}
