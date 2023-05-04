import React from 'react';
import styles from "../stylesheets/Landing.module.css";
import { Card } from './Card';
import { MovieObject } from "../types";

interface MyProps {
 movie: Array<MovieObject>,
 title: string,
 isNew: boolean
}

export const Landing:  React.FC<MyProps> = ({ movie, title, isNew }) => {

  return (
    <div className={styles.containerAll}>
        <div className={styles.containerTitle}>
            <h1>{title}</h1>
        </div>
        <div className={styles.containerCards}>
            <Card cardProps={movie[6]} isNew={isNew}/>
            <Card cardProps={movie[5]} isNew={isNew}/>
            <Card cardProps={movie[0]} isNew={isNew}/>
            <Card cardProps={movie[12]} isNew={isNew}/>
        </div>
    </div>
  )
}
