// import axios from "axios";
// import { User } from "../types";
// import { LoginGoogleSuccess, registerGoogleSuccess } from "../redux/actions";
// import { LoginGoogleSuccess } from "../redux/actions";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useGoogleLogin } from "@react-oauth/google";
import styles from "../stylesheets/googleBtn.module.css";
import { FcGoogle } from "react-icons/fc";

export const GoogleBtn = () => {
  // let object: User = {
  //   username: "",
  //   email: "",
  // };
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const viewAlert = async (res: any) => {
  //   object = {
  //     username: res.name,
  //     email: res.email,
  //   };
    
  //   const response = await axios.post(
  //     "http://localhost:3001/googlepost",
  //     object
  //   );
  //   dispatch(registerGoogleSuccess(object));
  //   if (response.data.success) {
  //     const login = await axios.post("http://localhost:3001/googlelogin", {
  //       email: object.email,
  //     });
  //     dispatch(LoginGoogleSuccess(login.data.data));
  //     setTimeout(() => {
  //       navigate("/User");
  //     }, 800);
  //   }
  // };

  const viewAlert = async () => { 
    //    object = {
    //   username: res.name,
    //   email: res.email,
    // };
    // dispatch(LoginGoogleSuccess(object));
    setTimeout(() => {
            navigate("/User");
          }, 800);
  }


// const midata = (tokenResponse: string) => {
//     const accessToken = tokenResponse;

//     axios
//       .get("https://www.googleapis.com/oauth2/v1/userinfo", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         return viewAlert();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => midata(tokenResponse.access_token),
//   });

  return (
    // <button className={styles.googleBtn} onClick={() => login()}>
    <button className={styles.googleBtn} onClick={()=> viewAlert()}>
      <FcGoogle />
    </button>
  );
};
