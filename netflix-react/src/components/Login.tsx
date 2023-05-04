import React, { useState } from 'react';
import styles from "../stylesheets/Register.module.css";
import logo from "../images/Netflix_Logo.png";
import { LoginForm } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LoginUserSuccess } from "../redux/actions";

export const Loginx = () => {
  const dispatch = useDispatch();
  const [errormsg, setErrormsg] = useState<boolean>(false)
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(true);
  const [inputValues, setInputValues] = useState<LoginForm>({ 
    email: "",
    password: ""
  })


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
   
  };

  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (!inputValues.password || !inputValues.email) {
      setErrormsg(true)
      setTimeout(() => {
          setErrormsg(false)
      }, 5000)
      return
    }
    else {
      const response = await axios.post('http://localhost:3001/Login', inputValues);
        if (response.data.success) {
          console.log(response.data.data, "Datos Completados");

          setTimeout(() => {
            dispatch(LoginUserSuccess(response.data.data))
            setInputValues({
                  email: "",
                  password: ""
              });
              navigate("/user")
          }, 1300)
    }
      else {
        setErrormsg(true)
        setTimeout(() => {
            setErrormsg(false)
        }, 5000)
        return
      }

    }
}

  return (
    <div className={styles.containerAll}>
      <div className={styles.container}>
        <div>
        <img src={logo} alt="" style={{height: "90px"}}/>
        </div>



        <div className={styles.center}>
        <div className={styles.containerForm}>
         
         
          <div className={styles.formTitle}>
             <h3>Sign In </h3>
          </div>


          <div className={styles.formInputs}>
            <form action="" onSubmit={e => handleSubmit(e)}>
              <input className={errormsg  ? styles.inputsError : styles.inputs} onChange={handleChange} value={inputValues.email} name='email' type="text" placeholder='Email' />
              <input className={errormsg ? styles.inputsError : styles.inputs} onChange={handleChange} value={inputValues.password} name="password" type="password" placeholder='Password'/>
              {errormsg && <span className={styles.spanError}>Password or email invalid</span>}
              <div>
                <button className={styles.btn} type='submit'>Login</button>
              </div>
            </form>
          </div>



          <div className={styles.forminfo}>
           
            <div>
              <span>
              New to Netflix?  
              </span>
             <Link style={{textDecoration: "none"}} to={"/Register"}>
              <span className={styles.Sign} style={{color:"white"}}>
               Sign up now.
              </span>
             </Link>
            </div>
          
            <div>
            <span>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. {open && <span onClick={()=> setOpen(!open)} className={styles.Learn} style={{color:"#0080ff"}}>Learn more.</span>}
             </span>
            </div>
            <div>
           {!open && <span> The information collected by Google reCAPTCHA is subject to the Google <span style={{color:"#0080ff"}}>Privacy Policy</span> and <span style={{color:"#0080ff"}}>Terms of Service</span>, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).
            </span>  }
            </div>
          </div>


        </div>
       </div>


      </div>
    </div>
  )
}
