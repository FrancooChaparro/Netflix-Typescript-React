import React, { useState } from "react";
import styles from "../stylesheets/Login.module.css";
import logo from "../images/Netflix_Logo.png";
import { RegisterForm, User } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { registerUserSuccess } from "../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";


function validate(input: RegisterForm) {
  let errors = {
    username: "",
    email: "",
    password: "",
  };
  const regexName = /^([a-zA-Z ]+)$/i;
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;                
 if (!input.username) {
    errors.username = "username is required";
  }

  if (input.username && !regexName.test(input.username)) {
    errors.username = "insert username valid";
  }

  if (input.username.length > 15 || input.username.length < 4) {
    errors.username = "insert username valid";
  }
  if (!input.password) {
    errors.password = "password is required";
  }

  if (input.password.length > 12) {
    errors.password = "Max 20 caracteres";
  }

  if (input.password.length < 8) {
    errors.password = "Min 8 Caracteress, 1 Mayusc, 1 Minus";
  }

  if (input.email && !regexEmail.test(input.email)) {
    errors.email = "insert email valid";
  }
  if (!input.email) {
    errors.email = "email is required";
  }

  return errors;
}

export const Register = () => {
  const dispatch = useDispatch();
  const regexName = /^([a-zA-Z ]+)$/i;
  const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

 

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);

    setErrors(
      validate({
        ...inputValues,
        [e.target.name]: e.target.value,
      })
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("hola");
    if (!inputValues.username || !inputValues.email || !inputValues.password) {
        return alert("Missing required fields!");
    }

    if (inputValues.email && inputValues.email.length > 0 && inputValues.email !== "") {
        if (!regexEmail.test(inputValues.email)) {
            return alert("Email invalid")
        }
      }

      if (inputValues.username && inputValues.username.length > 0 && inputValues.username !== "") {
        if (!regexName.test(inputValues.username)) {
            return alert("Name invalid")
        }
      }
      if (inputValues.password && inputValues.password.length > 0 && inputValues.password !== "") {
        if (!regexPassword.test(inputValues.password)) {
            return alert("Password invalid require 1May 1Min")
        }
      }

    //   if (emails.includes(inputValues.email)) {
    //     return alert("Invalid",'Email already exists', "error")
    // }

    const response = await axios.post(
      "http://localhost:3001/users",
      inputValues
    );
    dispatch(registerUserSuccess(inputValues));
    console.log(response);

    setInputValues({
      email: "",
      password: "",
      username: "",
    });
    navigate("/Login")
  }

  return (
    <div className={styles.containerAll}>
      <div className={styles.container}>
        <div>
          <img src={logo} alt="" style={{ height: "90px" }} />
        </div>

        <div className={styles.center}>
          <div className={styles.containerForm}>
            <div className={styles.formTitle}>
              <h3>Register</h3>
            </div>

            <div className={styles.formInputs}>
              <form action="" onSubmit={handleSubmit}>
                <input
                  className={
                    errors.username && inputValues.username
                      ? styles.inputsError
                      : styles.inputs
                  }
                  onChange={handleChange}
                  value={inputValues.username}
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                {errors.username && inputValues.username.length > 0 && (
                  <span className={styles.spanError}>{errors.username}</span>
                )}
                <input
                  className={
                    errors.email && inputValues.email
                      ? styles.inputsError
                      : styles.inputs
                  }
                  onChange={handleChange}
                  value={inputValues.email}
                  name="email"
                  type="text"
                  placeholder="Email"
                />
                {errors.email && inputValues.email.length > 0 && (
                  <span className={styles.spanError}>{errors.email}</span>
                )}
                <input
                  className={
                    errors.password && inputValues.password
                      ? styles.inputsError
                      : styles.inputs
                  }
                  onChange={handleChange}
                  value={inputValues.password}
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && inputValues.password.length > 0 && (
                  <span className={styles.spanError}>{errors.password}</span>
                )}
                <div>
                  <button type="submit" className={styles.btn}>
                    Sign up
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.forminfo}>
              <div>
                <span>Already have an account?</span>
                <Link to={"/Login"}>
                  <span className={styles.Sign} style={{ color: "white" }}>
                    Login.
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

