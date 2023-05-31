import styles from "../stylesheets/googleBtn.module.css";
import { FcGoogle } from "react-icons/fc";

export const GoogleBtn = () => {


  return (
    <button className={styles.googleBtn}>
      <FcGoogle />
    </button>
  );
};
