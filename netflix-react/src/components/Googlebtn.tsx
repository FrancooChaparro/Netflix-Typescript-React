import { useNavigate } from "react-router-dom";
import styles from "../stylesheets/googleBtn.module.css";
import { FcGoogle } from "react-icons/fc";

export const GoogleBtn = () => {

  const navigate = useNavigate();

  const viewAlert = async () => { 
    setTimeout(() => {
      navigate("/User");
          }, 800);
  }

  return (
    <button className={styles.googleBtn} onClick={()=> viewAlert()}> 
      <FcGoogle />
    </button>
  );
}
