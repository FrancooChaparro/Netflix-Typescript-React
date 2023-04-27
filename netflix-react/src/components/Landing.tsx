import React from 'react';
import styles from "../stylesheets/Landing.module.css";
import { Card } from './Card';

interface MyProps {
 movie: any
}


interface MyPropsCard {
  cardProps: any
 }

export const Landing:  React.FC<MyProps> = ({ movie }) => {
  console.log(movie, "RECIBO");
  
  return (
    <div className={styles.containerAll}>
        <div className={styles.containerTitle}>
            <h1>Trending now</h1>
        </div>
        <div className={styles.containerCards}>
            <Card cardProps={movie[5]}/>
            <Card cardProps={movie[6]}/>
            <Card cardProps={movie[8]}/>
            <Card cardProps={movie[9]}/>
        </div>
    </div>
  )
}
