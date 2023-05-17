import styles from "../stylesheets/Details.module.css";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { MovieObject } from "../types";

export const Details = () => {
    const [movieID, setmovieID] = useState<MovieObject>(); 
    const { id } = useParams();  // Consigo el id 
  
    // Con un useEffect obtengo la info y la guardo en el state y aparte dejo vacio el state
    useEffect(() => {
      fetch(`http://localhost:3001/movie/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setmovieID(data.result);
        })
        .catch((error) => console.log(error));
      return () => setmovieID({ 
        background: "",
        idi: 99,
        id: "",
        date: "", 
        gender: "",
        image: "",
        language: "",
        overview: "", 
        title: ""
    });
    }
      , []);

  return (
    <div className={styles.center}>
    <div className={styles.container}>
        <div className={styles.containerImg}>
           <img src={movieID?.image} alt={movieID?.title} />
        </div>

        <div className={styles.containerData}>
            <div>
             <h1>{movieID?.title}</h1>
             <h3>{movieID?.date} · {movieID?.gender} · ({movieID?.language.toUpperCase()})</h3>
             <h2>Overview</h2>
             <p className={styles.parf}>{movieID?.overview}</p>
             </div>
        </div>
    </div>
    </div>
  )
}
