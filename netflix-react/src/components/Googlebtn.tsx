import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { User } from "../types";
import { LoginGoogleSuccess, registerGoogleSuccess } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Googlebtn = () => {
  let object: User = {
    username: "",
    email: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientID =
    "205205007360-0da25t8cnonnon7nt4j786be0m47kjh4.apps.googleusercontent.com";

  const viewAlert = async () => {
    const response = await axios.post(
      "http://localhost:3001/googlepost",
      object
    );
    dispatch(registerGoogleSuccess(object));
    if (response.data.success) {
      const login = await axios.post("http://localhost:3001/googlelogin", {
        email: object.email,
      });
      console.log(login);
      dispatch(LoginGoogleSuccess(login.data.data));
      setTimeout(() => {
        navigate("/User");
      }, 200);
    }
  };

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  function onSuccess(response: any) {
    object = {
      username: response.profileObj.name,
      email: response.profileObj.email,
    };
    return viewAlert();
  }

  function onFailure(response: any) {
    console.log(response);
  }
  return (
    <GoogleLogin
      clientId={clientID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_policy"}
    />
  );
};
