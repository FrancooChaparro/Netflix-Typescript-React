import React from 'react';
import styles from "../stylesheets/Watching.module.css";
import Logo from "../images/Netflix-avatar.png";
import { Link } from "react-router-dom";

export const Watching = () => {
  return (
    <div className={styles.containerAll}>
        <div className={styles.container}>
            <div className={styles.top}>
                <h1>Who's Watching?</h1>
            </div>
            <div className={styles.bot}>
               <Link to={"/Home"}><img src={Logo} alt="Logo" className={styles.Hover}/></Link>
               <Link to={"/Home"} style={{color: "white", textDecoration: "none"}}> <h4>Franco Chaparro</h4></Link>
            </div>
        </div>
    </div>
  )
}
