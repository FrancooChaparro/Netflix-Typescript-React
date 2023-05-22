import axios from "axios";
// import { User } from "../types";
// import { LoginGoogleSuccess, registerGoogleSuccess } from "../redux/actions";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import styles from "../stylesheets/googleBtn.module.css"
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import { FcGoogle } from "react-icons/fc";

export const GoogleBtn = () => {
  // let object: User = {
  //   username: "",
  //   email: "",
  // };
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const callbackGoogle = (credentialResponse: any) => { 
  //   const res: any = jwt_decode(credentialResponse.credential);
  //   console.log(res); 
  //   object = {
  //     username: res.name,
  //     email: res.email,
  //   };
  //   return viewAlert(); 
  // }


  // const viewAlert = async () => {
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

  const midata = (tokenResponse: string) => {

   const accessToken = tokenResponse; // Coloca aquí tu token de acceso

    axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const login = useGoogleLogin({
    onSuccess: tokenResponse => midata(tokenResponse.access_token)

  });
//   return <GoogleLogin
//   onSuccess={credentialResponse => {
//      callbackGoogle(credentialResponse)
//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// />



return <button className={styles.googleBtn} onClick={() => login()}>
  <FcGoogle />
</button>;
}
