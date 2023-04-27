import React from 'react';
import styles from "../stylesheets/Card.module.css";
import { BsFillPlayFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs"
interface MyPropsCard {
  cardProps: any
 }
 
 export const Card:  React.FC<MyPropsCard> = ({ cardProps }) => {
   

  return (
    <div className={styles.containerCard}>
        <div className={styles.containerCardInfo}><img src={cardProps.image} alt="" className={styles.image}/></div>
        <div className={styles.containerCardInfo2}>
            <div className={styles.details}><img src={cardProps.image}  alt="" /></div>
            <div className={styles.details2}>
              <div className={styles.icons}>
                <div className={styles.play}><BsFillPlayFill /></div>
                <div className={styles.more}><BsChevronDown /></div>
              </div>
              <div className={styles.date}><span style={{color: "greenyellow"}}>New</span><span>{cardProps.data}</span></div>
              <div className={styles.duration}><span>{cardProps.title}</span></div>
              <div className={styles.gender}><span>Comedy</span></div>
            </div>
        </div>
    </div>
  )
}


// BsFillPlayFill
// MdExpandMore
// IoAddOutline


// interface MyPropsCard {
//   cardProps: any
//  }

// https://api.themoviedb.org/3/discover/movie?api_key=3aa2dc2d3ba567e17745ade8603cf282&with_genres=27
