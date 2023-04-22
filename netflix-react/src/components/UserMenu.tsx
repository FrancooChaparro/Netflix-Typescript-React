import React from 'react';
import styles from "../stylesheets/UserMenu.module.css";
import Avatar from "../images/Netflix-avatar.png";

export const UserMenu = () => {
  return (
    <div className={styles.containerMenu}>
        <div className={styles.containerAvatar}>
            <div className={styles.imagen}>
                <img src={Avatar} alt="" />
            </div>
            <div className={styles.username}>
                <span>Franco</span>
            </div>
        </div>
        
        <div className={styles.containerLogout}><span>Sign out of Netflix</span></div>
    </div>
  )
}
