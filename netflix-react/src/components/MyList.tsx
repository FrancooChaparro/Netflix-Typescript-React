import React from 'react';
import styles from "../stylesheets/Landing.module.css";
import { Card } from './Card';
import { MovieObject } from "../types"

interface MyProps {
 movie: Array<MovieObject>,
 title: string,
 isNew: boolean
}

export const MyList:  React.FC<MyProps> = ({ movie, title, isNew }) => {

  return (
    <div className={styles.containerAll}>
        <div className={styles.containerTitle}>
            <h1>{title}</h1>
        </div>
        <div className={styles.containerCards}>
           {
            movie.length > 0 && movie.map((mov, index) => { 
              return <Card key={index} cardProps={mov} isNew={isNew}/>
            })
           }
        </div>
    </div>
  )
}
