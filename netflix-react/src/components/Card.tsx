import React, { useState } from 'react';
import styles from "../stylesheets/Card.module.css";
import { BsFillPlayFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs"

interface MyPropsCard {
  cardProps: any
 }
 
 export const Card:  React.FC<MyPropsCard> = ({ cardProps }) => {
  const [loading, setLoading] = useState<boolean>(true);



  const handleImageLoad = () => {
    setLoading(false);
  };
  
  const handleImageError = () => {
    setLoading(true);
  };
  

  return (
    
    <div className={styles.containerCard}> 
         <div className={styles.containerCardInfo}>
         <img src={cardProps?.background} alt={cardProps?.title} className={styles.image}  onLoad={handleImageLoad}
    onError={handleImageError} /> 
        </div>
        {loading ? <div className={styles.spinner}></div> : <div className={styles.containerCardInfo2}>
            <div className={styles.details}><img src={cardProps?.background}  alt={cardProps?.title} style={{ filter: "brightness(110%)"}}/></div>
            <div className={styles.details2}>
              <div className={styles.icons}>
                <div className={styles.play}><BsFillPlayFill /></div>
                <div className={styles.more}><BsChevronDown /></div>
              </div>
              <div className={styles.date}><span style={{color: "greenyellow"}}>New</span><span>{cardProps?.date}</span></div>
              <div className={styles.duration}><span>{cardProps?.title}</span></div>
              <div className={styles.gender}><span>{cardProps?.gender}</span></div>
            </div>
        </div> }
    </div> 
  )
}