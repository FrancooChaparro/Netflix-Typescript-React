import React, { useState } from 'react';
import styles from "../stylesheets/Landing.module.css";
import { Card } from './Card';
import { MovieObject } from "../types"

interface MyProps {
 movie: Array<MovieObject>,
 title: string,
 isNew: boolean
}

export const Landing:  React.FC<MyProps> = ({ movie, title, isNew }) => {
  const [startIndex, setStartIndex] = useState(0);
  const moviesToShow = 4; // Cantidad de películas a mostrar a la vez
  const izq = "<"
  const der = ">"


  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + moviesToShow < movie.length) {
      setStartIndex(startIndex + 1);
    }
  };
  return (
    <div className={styles.containerAll}>
        <div className={styles.containerTitle}>
            <h1>{title}</h1>
        </div>
        <div className={styles.containerCards}>
        <div className={styles.btnDivI}><button onClick={handlePrev}>{izq}</button></div>
        {
          movie.length > 0 && movie.slice(startIndex, startIndex + moviesToShow).map((mov, index) => {
            return <Card key={index} cardProps={mov} isNew={isNew} AddorOut={"Añadir de mi lista"} />;
          })
        }
       <div className={styles.btnDiv}><button onClick={handleNext}>{der}</button></div>
            {/* <Card cardProps={movie[6]} isNew={isNew}/>
            <Card cardProps={movie[5]} isNew={isNew}/>
            <Card cardProps={movie[0]} isNew={isNew}/>
            <Card cardProps={movie[12]} isNew={isNew}/> */}
        </div>
    </div>
  )
}
