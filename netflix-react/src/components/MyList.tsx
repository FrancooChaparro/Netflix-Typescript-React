import  { useState } from 'react';
import styles from "../stylesheets/MyList.module.css";
import { Card } from './Card';
import { MovieObject } from "../types"

interface MyProps {
  movie: Array<MovieObject>,
  title: string,
  isNew: boolean,
  moviesToShow: number

}

 
export const MyList: React.FC<MyProps> = ({ movie, title, isNew, moviesToShow }) => {
  const [startIndex, setStartIndex] = useState(0);
  // const moviesToShow = 4; // Cantidad de películas a mostrar a la vez
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
      <div className={`${styles.containerCards} ${styles.transitionContainer}`}>
        {moviesToShow === 4 && <div className={styles.btnDivI}><button onClick={handlePrev}>{izq}</button></div>}
        {
          movie.length > 0 && movie.slice(startIndex, startIndex + moviesToShow).map((mov, index) => {
            return <Card key={index} cardProps={mov} isNew={isNew} AddorOut={"Quitar de mi lista"} />;
          })
        }
       {movie.length > 3 &&  moviesToShow === 4 && <div className={styles.btnDiv}><button onClick={handleNext}>{der}</button></div>} 
      </div>
    </div>
  );
};
