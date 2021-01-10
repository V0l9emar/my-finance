import React, { Component } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import People from "../../img/people.svg"

class Login extends Component {
  render() {
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
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"></label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
          </form>
          <Link
            to="/main"
            style={{ textDecoration: "none" }}
            className="Login__button"
          >
            <button>Sign-In</button>
          </Link>
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
}

export default Login;
