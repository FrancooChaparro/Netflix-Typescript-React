import React from 'react';
import styles from "../stylesheets/Landing.module.css";
import { Card } from './Card';

interface MyProps {
 movie: any,
 title: String
}


interface MyPropsCard {
  cardProps: any
 }

export const Landing:  React.FC<MyProps> = ({ movie, title }) => {
  console.log(movie, "RECIBO");
  
  return (
    <div className={styles.containerAll}>
        <div className={styles.containerTitle}>
            <h1>{title}</h1>
        </div>
        <div className={styles.containerCards}>
            <Card cardProps={movie[5]}/>
            <Card cardProps={movie[10]}/>
            <Card cardProps={movie[8]}/>
            <Card cardProps={movie[13]}/>
        </div>
    </div>
  )
}
