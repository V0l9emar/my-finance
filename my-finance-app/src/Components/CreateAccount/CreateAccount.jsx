import React, { useState } from "react";
import Axios from "axios";
import "./CreateAccount.css";
import { Link } from "react-router-dom";

function CreateAccount() {

  // render() {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const submitUser = () => {
    Axios.post("http://localhost:5000/users", {
      userName: userName,
      userLastName: userLastName,
      userMail: userMail,
      userBirthday: userBirthday,
      userPassword: userPassword,
    }).then(() => {
      console.log("successful insert user")
    })
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
              setUserName(e.target.value)
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
              setUserLastName(e.target.value)
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
              setUserMail(e.target.value)
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
              setUserBirthday(e.target.value)
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
              setUserPassword(e.target.value)
            }}
          />
        </div>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button
            className="create__button"
            disabled={
              !userName ||
              !userLastName ||
              !userMail ||
              !userBirthday ||
              !userPassword
            }
            onClick={submitUser}
          >
            Send
          </button>
        </Link>
      </form>
    </div>
  );
  // }
}

export default CreateAccount;
