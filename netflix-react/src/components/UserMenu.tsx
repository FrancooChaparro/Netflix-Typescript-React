import React from 'react';
import styles from "../stylesheets/UserMenu.module.css";
import Avatar from "../images/Netflix-avatar.png";
import { useSelector } from 'react-redux';
import { UserActive } from '../redux/reducer';
import { useNavigate } from 'react-router-dom';


interface typeProps { 
  type: Boolean
}


export const UserMenu: React.FC<typeProps> = ({ type }) => {
  const userActive = useSelector(UserActive)
  const navigate = useNavigate()


  function CerrarSes(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.preventDefault();
    setTimeout(() => {
      window.localStorage.removeItem("USUARIO")
      navigate("/Login")
    }, 1300)
  }

  return (
    <div className={type ? styles.containerMenu : styles.containerMenuOpactity }>
        <div className={styles.containerAvatar}>
            <div className={styles.imagen}>
                <img src={Avatar} alt="Avatar" />
            </div>
            <div className={styles.username}>
                <span>{userActive?.username ? userActive?.username : "Franco Chaparro"}</span>
            </div>
        </div>
        
        <div className={styles.containerLogout}><span className={styles.spans} onClick={CerrarSes}>Sign out of Netflix</span></div>
    </div>
  )
}
