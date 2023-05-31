import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "../stylesheets/googleBtn.module.css";
import { FcGoogle } from "react-icons/fc";

export const GoogleBtn = () => {

  const navigate = useNavigate();

  const viewAlert = async (res: any) => { 
    setTimeout(() => {
      navigate("/User");
          }, 800);
  }


const midata = (tokenResponse: string) => {
    const accessToken = tokenResponse;

    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        return viewAlert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => midata(tokenResponse.access_token),
  });



  return (
    <button className={styles.googleBtn} onClick={()=> login()}> 
      <FcGoogle />
    </button>
  );
}
