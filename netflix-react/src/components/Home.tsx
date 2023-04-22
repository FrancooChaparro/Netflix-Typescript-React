import React from 'react';
import { Navbar } from "./Navbar";
import styles from "../stylesheets/Home.module.css";

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
    </div>
  )
}
