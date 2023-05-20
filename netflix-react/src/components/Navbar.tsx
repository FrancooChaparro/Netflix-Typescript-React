import React, { useState, useEffect } from "react";
import styles from "../stylesheets/Navbar.module.css";
import Logo from "../images/Netflix_Logo.png";
import Avatar from "../images/Netflix-avatar.png";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { UserMenu } from "./UserMenu";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showBrowse, setShowBrowse] = useState<boolean>(false);
  const TOP_OFFSET = 66;
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (topp: number) => {
    window.scrollTo({
      top: topp,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={
        showBackground ? styles.containerAll : styles.containerAllOpacity
      }
    >
      <div className={styles.containerLogo}>
        <img src={Logo} alt="LogoNetflix" />
      </div>
      <div className={styles.containerInfo}>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(0)}>
          <span className={styles.span1} >Home</span>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(700)}>
          <span className={styles.span1} >Series</span>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(700)}>
          <span className={styles.span1} >Films</span>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(350)}>
          <span className={styles.span1} >New & Popular</span>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(550)}>
          <span className={styles.span1} >My List</span>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(800)}>
          <span className={styles.span1} >Premium Netflix</span>
        </Link>

        <span className={styles.btnBrowse} onClick={()=>setShowBrowse(!showBrowse)} style={{marginTop: "15px"}}>Browse</span>
    <BsChevronDown
                onClick={()=>setShowBrowse(!showBrowse)}
                className={showBrowse ? styles.ar : styles.ar2}
             
              />

       {showBrowse && <div className={showBackground ? styles.Browse : styles.BrowseOpacity}>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(0)}>
          <p>Home</p>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(700)}>
          <p>Series</p>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(700)}>
          <p>Films</p>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(350)}>
          <p>New & Popular</p>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(550)}>
          <p>My List</p>
        </Link>
        <Link to={"/"} className={styles.link} onClick={() => handleClick(800)}>
          <p>Premium Netflix</p>
        </Link>
        </div>
}
      </div>
      <div className={styles.containerUser}>
        <div className={styles.arriba}>
          <div className={styles.userDiv}>
            <Link to={"/Search"}>
              <BiSearch style={{ cursor: "pointer" }} />
            </Link>
          </div>
          <div className={styles.userDiv}>
            <IoNotificationsOutline style={{ cursor: "pointer" }} />
          </div>
          <div className={styles.userDiv1}>
            <img src={Avatar} alt="" />
            <div className={styles.arrow}>
              <BsChevronDown
                onClick={() => setShowMenu(!showMenu)}
                className={showMenu ? styles.showOpen : styles.show}
              />
            </div>
          </div>
        </div>

        <div className={styles.abajo}>
          <div className={styles.contentes}>
            {showMenu && <UserMenu type={showBackground} />}
          </div>
        </div>
      </div>
    </div>
  );
};
