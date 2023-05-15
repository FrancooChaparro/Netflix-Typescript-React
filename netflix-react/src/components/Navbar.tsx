import React, {useState, useEffect} from 'react';
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
  const TOP_OFFSET = 66;
  const [showBackground, setShowBackground] = useState<boolean>(false)

  useEffect(()=> { 
    const handleScroll = () => { 
      if (window.scrollY >= TOP_OFFSET ) {
        setShowBackground(true)
      } else { 
        setShowBackground(false)
      }
    }

    window.addEventListener("scroll", handleScroll); 

    return () => { 
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])


  const handleClick = (topp: number) => {
    window.scrollTo({
      top: topp,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={showBackground ? styles.containerAll : styles.containerAllOpacity }>
     <div className={styles.containerLogo}>
     <img src={Logo} alt="" style={{height: "52px"}}/>
     </div>
     <div className={styles.containerInfo}>
        <Link to={"/Home"} className={styles.link} onClick={()=> handleClick(0)}><span>Home</span></Link>
        <Link to={"/Home"} className={styles.link} onClick={()=> handleClick(700)}><span>Series</span></Link>
        <Link to={"/Home"} className={styles.link} onClick={()=> handleClick(700)}><span>Films</span></Link>
        <Link to={"/Home"} className={styles.link} onClick={()=> handleClick(350)}><span>New & Popular</span></Link>
        <Link to={"/Home"} className={styles.link} onClick={()=> handleClick(550)}><span>My List</span></Link>
        <Link to={"/Home"} className={styles.link} onClick={()=> handleClick(800)}><span>Premium Netflix</span></Link>
     </div>
     <div className={styles.containerUser}>


      <div className={styles.arriba}>

        <div className={styles.userDiv}><Link to={"/Search"}><BiSearch style={{cursor: "pointer"}}/></Link></div>
        <div className={styles.userDiv}><IoNotificationsOutline style={{cursor: "pointer"}}/></div>
        <div className={styles.userDiv1}>
            <img src={Avatar} alt=""  />
            <div className={styles.arrow}><BsChevronDown onClick={()=> setShowMenu(!showMenu)} className={showMenu ? styles.showOpen : styles.show}/></div>
        </div>

      </div>

        <div className={styles.abajo}>
            <div className={styles.contentes}>
            {showMenu && <UserMenu type={showBackground} /> }
            </div>
        </div>

     </div>


    </div>
  )
}
