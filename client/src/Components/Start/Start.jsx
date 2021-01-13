import React, { Component } from "react";
import "./Start.css";
import { Link } from "react-router-dom";
import FinanceLogo from "../../img/finance.svg";

class Start extends Component {
  render() {
    return (
      <div className="Start">
        <h1>My Finance</h1>
        <h6>Your simple financial assistant</h6>
        <img src={FinanceLogo} alt="FinanceLogo" className="start__logo"/>
        <div className="Start__create">
          <Link
            to="/authorization"
            style={{ textDecoration: "none" }}
            className="Start__button"
          >
            {/* <button>Let's start</button> */}
            <button type="button" className="btn btn-outline-primary">Let's start</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Start;
