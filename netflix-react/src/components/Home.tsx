import React, {useEffect} from 'react';
import { Navbar } from "./Navbar";
import styles from "../stylesheets/Home.module.css";
import Background from "../images/img1.jpg"
import { Landing } from './Landing';
import { GetMovies } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Movies } from '../redux/reducer';
import axios from "axios";

interface MyProps {
  movie: any
 }

export const Home = () => {
  const counterValue = useSelector(Movies) || [];
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      const moviesAction = await GetMovies();
      dispatch(moviesAction);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <div className={styles.ContainerBackground}>
        <img src={Background} alt="" className={styles.background} />
      </div>
       <Landing movie={counterValue}/>
       <Landing movie={counterValue}/>
    </div>
  )
}
