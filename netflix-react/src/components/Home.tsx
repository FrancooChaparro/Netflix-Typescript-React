import React, {useState, useEffect} from 'react';
import { Navbar } from "./Navbar";
import styles from "../stylesheets/Home.module.css";
import { Landing } from './Landing';
import { GetMovies } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Movies } from '../redux/reducer';
import { MovieObject } from "../types";


export const Home = () => {
  const counterValue = useSelector(Movies) || [];
  const dispatch = useDispatch()
  const [num, setNum] = useState<number>(0);
  const terror = counterValue.filter((movie: MovieObject) => movie.gender === "Terror") || Array<MovieObject>
  const trending = counterValue.filter((movie: MovieObject) => movie.gender === "Trending") || Array<MovieObject>
  const comedy = counterValue.filter((movie: MovieObject) => movie.gender === "Comedy") || Array<MovieObject>
  const Music = counterValue.filter((movie: MovieObject) => movie.gender === "Music") || Array<MovieObject>
  const tv = counterValue.filter((movie: MovieObject) => movie.gender === "TV") || Array<MovieObject>
  const [loading, setLoading] = useState<boolean>(true);


useEffect(()=> { 
  setTimeout(()=> { 
    setLoading(false)
  },1300)
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
      if(num > 18) setNum(num => num - 1);
      else setNum(num => num + 1);
    }, 14000);
    
    return () => clearInterval(interval);
  }, []);
  
  
  const cartelera: MovieObject = terror[num]

  return (
    <div>
    {loading ? <div className={styles.center}><div className={styles.spinner}></div></div>  :  <div className={styles.homeContainer}>
      <Navbar />
   <div className={styles.ContainerBackground}>
    <img src={cartelera?.background} alt="logo" className={styles.background}/> 
        <div className={styles.containerData}>
          <p className={styles.title}>{cartelera?.title}</p>
          <p className={styles.description}>{cartelera?.overview}</p>
        </div> 
      </div>
       <Landing isNew={true} title={"Trending Now"} movie={trending}/><br />
       <Landing isNew={false} title={"Music"} movie={Music}/> <br />
       <Landing isNew={false}title={"Comedy"} movie={comedy}/> <br />
       <Landing isNew={false}title={"Terror"} movie={terror}/> <br />
       <Landing isNew={false}title={"Programas TV"} movie={tv}/>
    </div> }
    </div>
  )
}
