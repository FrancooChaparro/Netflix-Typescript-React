import React from 'react';
import styles from "../stylesheets/Watching.module.css";
import Logo from "../images/Netflix-avatar.png";
import { Link } from "react-router-dom";
import { UserActive } from '../redux/reducer';
import { useSelector } from 'react-redux';
import { User } from "../types";


export const Watching = () => {
  const ActiveUser: User | null = useSelector(UserActive)

  return (
    <div className={styles.containerAll}>
        <div className={styles.container}>
            <div className={styles.top}>
                <h1>Who's Watching?</h1>
            </div>
            <div className={styles.bot}>
               <Link to={"/"}><img src={Logo} alt="Logo" className={styles.Hover}/></Link>
               <Link to={"/"} style={{color: "white", textDecoration: "none"}}> <h4>{ActiveUser?.username ? ActiveUser?.username : "Franco Chaparro"}</h4></Link>
            </div>
        </div>
    </div>
  )
}
