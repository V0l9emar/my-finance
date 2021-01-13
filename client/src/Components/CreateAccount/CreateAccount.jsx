import React, { useState } from "react";
import Axios from "axios";
import "./CreateAccount.css";
import { Link } from "react-router-dom";

function CreateAccount() {
  const [userNameReq, setUserNameReq] = useState("");
  const [userLastNameReq, setUserLastNameReq] = useState("");
  const [userMailReq, setUserMailReq] = useState("");
  const [userBirthdayReq, setUserBirthdayReq] = useState("");
  const [userPasswordReq, setUserPasswordReq] = useState("");

  const submitRegister = () => {
    Axios.post("http://localhost:5000/register", {
      userNameReq: userNameReq,
      userLastNameReq: userLastNameReq,
      userMailReq: userMailReq,
      userBirthdayReq: userBirthdayReq,
      userPasswordReq: userPasswordReq,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="Form">
      <h1>Create Account</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            name="userName"
            placeholder="Name"
            onChange={(e) => {
              setUserNameReq(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputSureName" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            name="userLastName"
            placeholder="Surename"
            onChange={(e) => {
              setUserLastNameReq(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label"></label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            name="userMail"
            placeholder="Email"
            onChange={(e) => {
              setUserMailReq(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDate" className="form-label"></label>
          <input
            type="date"
            className="form-control"
            id="exampleInputDate"
            aria-describedby="emailHelp"
            name="userBirthday"
            placeholder="Birth Date"
            onChange={(e) => {
              setUserBirthdayReq(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label"></label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="userPassword"
            placeholder="Password"
            onChange={(e) => {
              setUserPasswordReq(e.target.value);
            }}
          />
        </div>
        <Link to="/authorization" style={{ textDecoration: "none" }}>
          <button
            className="create__button"
            disabled={
              !userNameReq ||
              !userLastNameReq ||
              !userMailReq ||
              !userBirthdayReq ||
              !userPasswordReq
            }
            onClick={submitRegister}
          >
            Send
          </button>
        </Link>
      </form>
    </div>
  );
}

export default CreateAccount;
