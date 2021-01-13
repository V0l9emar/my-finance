// import React, { Component } from "react";
import React, {useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Start from "./Components/Start/Start";
import Authorization from "./Components/Authorization/Authorization";
import Form from "./Components/CreateAccount/CreateAccount";
import Main from "./Components/MainPage/Main";
import Daily from "./Components/MainPage/Daily/Daily";
import Weekly from "./Components/MainPage/Weekly/Weekly";
import Monthly from "./Components/MainPage/Monthly/Monthly";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
// import * as ReactBootStrap from "react-bootstrap";
// import Weekly from './Components/MainPage/Weekly/Weekly';

function App() {
  const [isLoading, setLoading] = useState(true);

  function fakeRequest() {
    return new Promise((resolve) => setTimeout(() => resolve(), 3000));
  }

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove();
        setLoading(!isLoading);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <BrowserRouter>
      <Route path="/start">
        <div className="App">
          <Start />
        </div>
      </Route>
      <Route path="/authorization">
        <div className="App">
          <Authorization />
        </div>
      </Route>
      <Route path="/form">
        <div className="App">
          <Form />
        </div>
      </Route>
      <Route path="/main">
        <div className="App">
          <Main />
        </div>
      </Route>
      <Route path="/daily">
        <div className="App">
          <Daily />
        </div>
      </Route>
      <Route path="/weekly">
        <div className="App">
          <Weekly />
        </div>
      </Route>
      <Route path="/monthly">
        <div className="App">
          <Monthly />
        </div>
      </Route>
      {/* {<ReactBootStrap.Spinner animation="grow" variant="secondary" />} */}
    </BrowserRouter>
  );
}

export default App;
