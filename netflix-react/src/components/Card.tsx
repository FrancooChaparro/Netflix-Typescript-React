import React from 'react';
import styles from "../stylesheets/Card.module.css";

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
              <div className={styles.icons}></div>
              <div className={styles.date}></div>
              <div className={styles.duration}></div>
              <div className={styles.gender}></div>
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

// export const Card:  React.FC<MyPropsCard> = ({ cardProps }) => {
//   return (
//     <div className={styles.containerCard}>
//         <img src={cardProps.image} alt="" className={styles.image}/>
//         <div className={styles.containerCardInfo}>
//             <img src={cardProps.image}  alt="" className={styles.imageInfo}/>
//             <div className={styles.data}>
//                   Title peli
//             </div>
//         </div>
//     </div>
//   )
// }





// <img src={cardProps.image}  alt="" className={styles.imageInfo}/>
// <h1>Title</h1>
// <h4>Logo</h4>
//  <h4>logo</h4> 