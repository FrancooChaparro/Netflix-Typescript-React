import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import styles from "../stylesheets/Home.module.css";
import { Landing } from "./Landing";
import { useDispatch, useSelector } from "react-redux";
import { Movies, UserActive } from "../redux/reducer";
import { MovieObject } from "../types";
import { Footer } from "./Footer";
import { myList } from "../redux/reducer";
import { MyList } from "./MyList";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { addMyList } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const AllMovies: Array<MovieObject> | [] = useSelector(Movies);
  const User = useSelector(UserActive);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [num, setNum] = useState<number>(0);
  const terror: Array<MovieObject> | [] = AllMovies.filter(
    (movie: MovieObject) => movie.gender === "Terror"
  );
  const trending: Array<MovieObject> | [] = AllMovies.filter(
    (movie: MovieObject) => movie.gender === "Trending"
  );
  const comedy: Array<MovieObject> | [] = AllMovies.filter(
    (movie: MovieObject) => movie.gender === "Comedy"
  );
  const Music: Array<MovieObject> | [] = AllMovies.filter(
    (movie: MovieObject) => movie.gender === "Music"
  );
  const tv: Array<MovieObject> | [] = AllMovies.filter(
    (movie: MovieObject) => movie.gender === "TV"
  );
  const [loading, setLoading] = useState<boolean>(true);

  let MyListMovies: Array<MovieObject> | [] = useSelector(myList);
    
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, []);

  if (num === 19) {
    setNum(0); // Reiniciar a la primera película
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (num === 19) {
        setNum(0); // Reiniciar a la primera película
      } else {
        setNum((num) => num + 1);
      }
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  
  const addMyListToStore = (props: MovieObject) => {

    const existentMovie = MyListMovies.find((e) => e.title === props.title);

    if (existentMovie) {
      alert("Ya está en tu lista");
    } else {
      const action = addMyList(props);
      dispatch(action);
    }
  };

  function linktag () { 
    navigate("/Details/" + poster.id)
  }

  const poster: MovieObject = terror[num];
  console.log(poster);
  
  return (
    <div>
      {loading ? (
        <div className={styles.center}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <div className={styles.homeContainer}>
          <Navbar />
          <div className={styles.ContainerBackground}>
            <img
              src={poster?.background}
              alt="logo"
              className={styles.background}
            />
            <div className={styles.containerData}>
              <p className={styles.title}>{poster?.title}</p>
              <p className={styles.description}>{poster?.overview}</p>
              <div className={styles.containerBtn}>
              <button onClick={()=> addMyListToStore(poster)} className={styles.btnAdd}><IoMdAdd className={styles.icon} /> AddList</button>
              <button onClick={()=> linktag()} className={styles.btnInfo}><AiOutlineInfoCircle className={styles.icon}/>More Info</button>
              </div>
            </div>
          </div>
          <Landing isNew={true} title={"Trending Now"} movie={trending} />
          {MyListMovies.length > 0 && (
            <MyList isNew={false} title={"My List"} movie={MyListMovies} />
          )}
          <Landing isNew={false} title={"Music"} movie={Music} />
          <Landing isNew={false} title={"Comedy"} movie={comedy} />
          <Landing isNew={false} title={"Terror"} movie={terror} />
          <Landing isNew={false} title={"Programas TV"} movie={tv} />
        </div>
      )}
      <Footer />
    </div>
  );
};
