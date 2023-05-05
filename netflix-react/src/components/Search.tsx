import React, { useEffect} from 'react';
import styles from "../stylesheets/Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Movies } from '../redux/reducer';
import { MovieObject } from "../types";
import { GetMovies } from '../redux/actions';


export const Search = () => {
  const AllMovies: Array<MovieObject> | [] = useSelector(Movies);
  const dispatch = useDispatch()
  console.log(AllMovies);
  
  useEffect(() => {
    const fetchData = async () => {
      const moviesAction = await GetMovies();
      dispatch(moviesAction);
    };
    fetchData();
  }, [dispatch]);
  
  return (
    <div className={styles.containerAll}>
        <div className={styles.containerNavbar}></div>
        <div className={styles.containerLeft}>
            <div className={styles.containerInput}><input type="text" placeholder='Search Movie' /></div>
            <div className={styles.containerBtn}>
            <button>Comedia</button>
            <button>Terror</button>
            <button>TV Programas</button>
            <button>Music</button>
            </div>
        </div>
        <div className={styles.containerRight}>
            <h1>Peliculas</h1>
            
              <div className={styles.movieContainer}>
           
             {AllMovies.length < 0  ? <div><h2 style={{color: "red"}}>hola</h2></div> :  AllMovies.map((movie: MovieObject) => { 
                return <img src={movie.image} width={"200px"} height={"350px"} alt={movie.id} />
            }).slice(0,80)}
            
            </div> 
            
        </div>  
    </div> 
  )
}
