import React, { useEffect, useState} from 'react';
import styles from "../stylesheets/Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Movies, movieName } from '../redux/reducer';
import { MovieObject } from "../types";
import { GetMovies, getMovieName } from '../redux/actions';


export const Search = () => {
  let AllMovies: Array<MovieObject> | [] = useSelector(Movies);
  let movie: Array<MovieObject> | [] = useSelector(movieName);
  const [load, setLoad] = useState<boolean>(true)
  const dispatch = useDispatch()
  console.log(AllMovies);
  console.log(movie, "Movie");
  const [countrie, setCountrie] = useState<string>("");


  const countrieName = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setCountrie(e.target.value);
  }


  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const fetchData = async () => {
      const MovieNAME = await getMovieName(countrie.trim())
      dispatch(MovieNAME);
    };
    fetchData();
    setTimeout(()=> { 
      setLoad(false)
    },1000)
    setCountrie("")
  }
  
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoad(true)
      handleSearch(e);
    }
  }
  
  
  useEffect(() => {
    const fetchData = async () => {
      const moviesAction = await getMovieName(countrie.trim())
      dispatch(moviesAction);
    };
    fetchData();
  }, [dispatch]);

  useEffect(()=> { 
    setTimeout(()=> { 
      setLoad(false)
    },3000)
  },[])
  
  return (
    <div className={styles.containerAll}>
        <div className={styles.containerNavbar}></div>
        <div className={styles.containerLeft}>
            <div className={styles.containerInput}><input name="Enter" onKeyPress={(e) => handleEnter(e)} className={styles.SearchBar} value={countrie} onChange={countrieName} type='text' placeholder='Search Movie' /></div>
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
           
             {load ? <div className={styles.center}><div className={styles.spinner}></div></div> : movie.length > 0 && movie.map((movie: MovieObject, index) => { 
  return <img key={index} src={movie.image} width={"200px"} height={"350px"} alt={movie.id} /> 
}).slice(0,17) } 
            
            </div> 
            
        </div>  
    </div> 
  )
}



// {movie.length > 0 ?  movie.map((movie: MovieObject, index) => { 
//   return <img key={index} src={movie.image} width={"200px"} height={"350px"} alt={movie.id} /> 
// }).slice(0,17)} 


// <h3 style={{color: "red"}}>No se encontro resultados</h3>