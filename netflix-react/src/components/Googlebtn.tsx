import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";


export const Googlebtn = () => {
  const clientID =
    "205205007360-0da25t8cnonnon7nt4j786be0m47kjh4.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  function onSuccess(response: any) {
    console.log(response);
  }

  function onFailure(response: any) {
    console.log(response);
  }
  return (
    <GoogleLogin
      clientId={clientID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_policy "}
    />
  );
};
