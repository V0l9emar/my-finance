import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, Redirect } from "react-router-dom";
// import { Axios } from 'axios';

function Authorization() {
  const history = useHistory();
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  // const logOnMain = ()=> {
  //   props.history.push("/main");
  // }
  const handleClick = () => {
    history.push("/main");
  };
  Axios.defaults.withCredentials = true;
  const submitLogin = () => {
    Axios.post("http://localhost:5000/login", {
      userMail: userMail,
      userPassword: userPassword,
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        // setLoginStatus(response.data.message);
        setLoginStatus(false);
      } else {
        // setLoginStatus(response.data.name);
        setLoginStatus(true);
        handleClick();
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].name);
      }
    });
  }, []);

  return (
    <div className="Login">
      <h1>My Finance</h1>
      <FontAwesomeIcon icon={faUserCircle} size="10x" color="#60C6D8" />
      <div className="Login__inputs">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"></label>
            <input
              type="email"
              className="form-control testLogin"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(e) => {
                setUserMail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
            ></label>
            <input
              type="password"
              className="form-control testLogin"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </div>
        </form>
        {/* <Link
          to="/main"
          style={{ textDecoration: "none" }}
          className="Login__button"
        > */}
        <h6>
          {loginStatus && <FontAwesomeIcon icon={faFrown} size="1x" color="#60C6D8" />}
          
        </h6>
        <button onClick={submitLogin}>Sign-In</button>
        {/* </Link> */}
      </div>
      <div className="Login__create">
        <h6>Don't have an account ?</h6>
        <h5>
          <Link
            to="/form"
            style={{ textDecoration: "none" }}
            className="Login__signup"
          >
            Sign-up
          </Link>
        </h5>
      </div>
      <div className="created__by">
        <p className="created__from">Created by Voldemar</p>
        <p className="created__from">© all rights reserved</p>
      </div>
    </div>
  );
}

export default Authorization;
