import React from 'react';
import styles from "../stylesheets/Navbar.module.css";
import Logo from "../images/Netflix_Logo.png";
import Avatar from "../images/Netflix-avatar.png";
import { BiSearch } from "react-icons/bi" 
import { IoNotificationsOutline } from "react-icons/io5" 
import { BsChevronDown } from "react-icons/bs" 


export const Navbar = () => {
  return (
    <div className={styles.containerAll}>
     <div className={styles.containerLogo}>
     <img src={Logo} alt="" style={{height: "52px"}}/>
     </div>
     <div className={styles.containerInfo}>
        <span>Home</span>
        <span>Series</span>
        <span>Films</span>
        <span>New & Popular</span>
        <span>My List</span>
        <span>Browse by Lenguages</span>
     </div>
     <div className={styles.containerUser}>
        <div className={styles.userDiv}><BiSearch /></div>
        <div className={styles.userDiv}><IoNotificationsOutline /></div>
        <div className={styles.userDiv1}>
            <img src={Avatar} alt=""  />
            <div className={styles.arrow}><BsChevronDown /></div>
        </div>
     </div>
    </div>
  )
}

// BiSearch
// IoNotificationsOutline
// BsChevronDown