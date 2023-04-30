import React, {useState} from 'react';
import styles from "../stylesheets/Navbar.module.css";
import Logo from "../images/Netflix_Logo.png";
import Avatar from "../images/Netflix-avatar.png";
import { BiSearch } from "react-icons/bi" 
import { IoNotificationsOutline } from "react-icons/io5" 
import { BsChevronDown } from "react-icons/bs" ;
import { UserMenu } from "./UserMenu";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className={styles.containerAll}>
     <div className={styles.containerLogo}>
     <img src={Logo} alt="" style={{height: "52px"}}/>
     </div>
     <div className={styles.containerInfo}>
        <Link to={"/Home"} style={{textDecoration: "none"}} onClick={() => window.scrollTo(0, 0)}><span>Home</span></Link>
        <Link to={"/Home"} style={{textDecoration: "none"}} onClick={() => window.scrollTo(0, 300)}><span>Series</span></Link>
        <span>Films</span>
        <span>New & Popular</span>
        <span>My List</span>
        <span>Browse by Lenguages</span>
     </div>
     <div className={styles.containerUser}>


      <div className={styles.arriba}>

        <div className={styles.userDiv}><BiSearch style={{cursor: "pointer", }}/></div>
        <div className={styles.userDiv}><IoNotificationsOutline style={{cursor: "pointer"}}/></div>
        <div className={styles.userDiv1}>
            <img src={Avatar} alt=""  />
            <div className={styles.arrow}><BsChevronDown onClick={()=> setShowMenu(!showMenu)} className={showMenu ? styles.showOpen : styles.show}/></div>
        </div>

      </div>

        <div className={styles.abajo}>
            <div className={styles.contentes}>
            {showMenu && <UserMenu /> }
            </div>
        </div>

     </div>


    </div>
  )
}
