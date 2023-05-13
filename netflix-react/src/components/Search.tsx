import React, { useEffect, useState} from 'react';
import styles from "../stylesheets/Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Movies, movieName } from '../redux/reducer';
import { MovieObject } from "../types";
import { getMovieName, MovieFilter, GetMovies } from '../redux/actions';


export const Search = () => {
  let movie: Array<MovieObject> | [] = useSelector(movieName);
  const [load, setLoad] = useState<boolean>(true)
  const dispatch = useDispatch()
  const [countrie, setCountrie] = useState<string>("");
  console.log(movie);
  const [nameTitle, setnameTitle] = useState<string>("Peliculas");


  const countrieName = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setCountrie(e.target.value);
  }

  const FilterMovie = (e: React.MouseEvent<HTMLButtonElement>) => { 
    setLoad(true)
    setTimeout(()=> { 
      setLoad(false)
    },1300)
    console.log("click", e.currentTarget.value);
    const retorno = MovieFilter(e.currentTarget.value)
    setnameTitle(e.currentTarget.value)
    dispatch(retorno)
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
      setnameTitle("Peliculas")
    }
  }
  
  
  useEffect(()=> { 
    setTimeout(()=> { 
      const fetchData = async () => {
        const moviesAction = await getMovieName(countrie.trim())
        dispatch(moviesAction);
      };
      fetchData();
      setLoad(false)
    },3000)
  },[])
  
  return (
    <div className={styles.containerAll}>
        <div className={styles.containerNavbar}></div>
        <div className={styles.containerLeft}>
            <div className={styles.containerInput}><input name="Enter" onKeyPress={(e) => handleEnter(e)} className={styles.SearchBar} value={countrie} onChange={countrieName} type='text' placeholder='Search Movie' /></div>
            <div className={styles.containerBtn}>
            <button value={"Comedy"} onClick={FilterMovie}>Comedia</button>
            <button value={"TV"} onClick={FilterMovie}>TV Programas</button>
            <button value={"Music"} onClick={FilterMovie}>Music</button>
            <button value={"Terror"} onClick={FilterMovie}>Terror</button>
            </div>
        </div>
        <div className={styles.containerRight}>
            <h1>{nameTitle}</h1>
            
              <div className={styles.movieContainer}>
           
             {load ? <div className={styles.center}><div className={styles.spinner}></div></div> : movie.length > 0 ? movie.map((movie: MovieObject, index) => { 
  return <img key={index} src={movie.image} width={"200px"} height={"350px"} alt={movie.id} /> 
}).slice(0,12) : <h3 style={{color: "red"}}>No se encontro resultados</h3>  } 
            
            </div> 
            
        </div>  
    </div> 
  )
}
