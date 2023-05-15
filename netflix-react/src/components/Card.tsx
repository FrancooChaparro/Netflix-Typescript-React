import React, { useState } from "react";
import styles from "../stylesheets/Card.module.css";
import { BsFillPlayFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { MovieObject } from "../types";
import { addMyList, OutMyList } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { myList } from "../redux/reducer";

interface MyPropsCard {
  cardProps: MovieObject;
  isNew: boolean;
  AddorOut: string;
}

export const Card: React.FC<MyPropsCard> = ({ cardProps, isNew, AddorOut }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState<boolean>(false)
  let MyListMovies: Array<MovieObject> | [] = useSelector(myList);
  
  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(true);
  };

  const addMyListToStore = (props: MovieObject, text: string ) => {
    if (text === "Quitar de mi lista") { 
      const OutList = OutMyList(props);
      setShowMenu(!showMenu)
     return dispatch(OutList);
    }
    
    const existentMovie = MyListMovies.find((e) => e.title === props.title);

    if (existentMovie) {
      setShowMenu(!showMenu)
      alert("Ya está en tu lista");
    } else {
      const action = addMyList(props);
      setShowMenu(!showMenu)
      dispatch(action);
    }
  };

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerCardInfo}>
        <img
          src={cardProps.background}
          alt={cardProps?.title}
          className={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : (
        <div className={styles.containerCardInfo2}>
          <div className={styles.details}>
            <img
              src={cardProps?.background}
              alt={cardProps?.title}
              style={{ filter: "brightness(110%)" }}
            />
          </div>
          <div className={styles.details2}>
            <div className={styles.icons}>
              <div className={styles.play}>
                <BsFillPlayFill />
              </div>
              <div onClick={()=> setShowMenu(!showMenu)} className={styles.more}>
                <BsChevronDown className={showMenu ? styles.showOpen : styles.show}/>
              </div>
            </div>
            <div className={styles.date}>
              {isNew && <span style={{ color: "greenyellow" }}>New</span>}
              <span>{cardProps?.date}</span>
            </div>
            <div className={styles.duration}>
              <span>{cardProps?.title.substring(0, 37)}</span>
            </div>
            <div className={styles.gender}>
              <span>{cardProps?.gender}</span>
            </div>
          </div>
          {showMenu && <div className={styles.addMenu}>
            <div className={styles.addMenu1} onClick={() => addMyListToStore(cardProps, AddorOut)}>{AddorOut}</div>
            <div className={styles.addMenu2}>Ver Detalles</div>
          </div> }
        </div>
      )}
    </div>
  );
};
