import React from 'react';
import styles from "../stylesheets/Watching.module.css";
import Logo from "../images/Netflix-avatar.png";
import { Link } from "react-router-dom";
import { selectCounterValue } from '../redux/reducer';
import { useSelector } from 'react-redux';


export const Watching = () => {
  const UserActive = useSelector(selectCounterValue)
  console.log(UserActive, "User");
  
  return (
    <div className={styles.containerAll}>
        <div className={styles.container}>
            <div className={styles.top}>
                <h1>Who's Watching?</h1>
            </div>
            <div className={styles.bot}>
               <Link to={"/Home"}><img src={Logo} alt="Logo" className={styles.Hover}/></Link>
               <Link to={"/Home"} style={{color: "white", textDecoration: "none"}}> <h4>{UserActive?.username ? UserActive?.username : "Franco Chaparro"}</h4></Link>
            </div>
        </div>
    </div>
  )
}
