import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { Doughnut } from "react-chartjs-2";
import "./Main.css";

function Main() {
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [trsInc, setTrsInc] = useState("");
  const [trsOut, setTrsOut] = useState("");
  const [createList, getList] = useState([]);
  const [showBalance, getBalance] = useState("");
  const [showSumIncome, setShowSumIncome] = useState("");
  const [showSumOut, setShowSumOut] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/transactions").then((response) => {
      getList(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/balance").then((response) => {
      //   getBalance(response.data.reduce((a, b) => a+b));
      let res;
      let dataFrom = response.data;
      let idx = dataFrom.length - 1;
      if (idx === -1) {
        res = 0;
      } else {
        res = dataFrom[idx].balance;
      }
      getBalance(res);
    });
  }, []);
  //   console.log(showBalance);

  //   function getBalanceSum(){
  //       let idx = showBalance.length - 1;
  //       console.log(showBalance[idx].balance);
  //     //   setShowSum(res)
  //     //   return res
  //   }
  //   getBalanceSum();

  useEffect(() => {
    Axios.get("http://localhost:5000/incomeSum").then((response) => {
      let income = response.data;
      income.map((val) => {
        let incomeSumVal = val.trs_inc;
        setShowSumIncome(incomeSumVal);
      });
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:5000/outcomeSum").then((response) => {
      let outcome = response.data;
      outcome.map((val) => {
        let outcomeSumVal = val.trs_out;
        setShowSumOut(outcomeSumVal);
      });
    });
  }, []);
  //   console.log(showSumOut)

  const submitOperationInc = () => {
    Axios.post("http://localhost:5000/transactions", {
      fromName: fromName,
      toName: toName,
      trsInc: trsInc,
      trsOut: 0,
    }).then(() => {
      alert("successful insert transaction");
    });
    window.location.reload(false);
  };

  const submitOperationOut = () => {
    Axios.post("http://localhost:5000/transactions", {
      fromName: fromName,
      toName: toName,
      trsInc: 0,
      trsOut: trsOut,
    }).then(() => {
      alert("successful insert transaction");
    });
    window.location.reload(false);
  };
  const data = {
    labels: ["Income", "Outcome"],
    datasets: [
      {
        label: "# of Votes",
        data: [showSumIncome, showSumOut],
        backgroundColor: ["#60C6D8", "#c750a3"],
        borderColor: ["#60C6D8", "#c750a3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    // <BrowserRouter>
    <div className="Main">
      <h1>Main</h1>
      <div className="Main__header">
        <Link
          to="/monthly"
          style={{ textDecoration: "none" }}
          className="Login__button"
        >
          <button className="buttons">Monthly</button>
        </Link>
        <Link
          to="/weekly"
          style={{ textDecoration: "none" }}
          className="Login__button"
        >
          <button className="buttons">Weekly</button>
        </Link>
        <Link
          to="/daily"
          style={{ textDecoration: "none" }}
          className="Login__button"
        >
          <button className="buttons">Daily</button>
        </Link>
      </div>
      <Doughnut data={data} />
      <div className="Main__balance">
        <h6>balance: </h6>
        <h4> {showBalance} azn</h4>
      </div>
      <div className="main__table">
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Income</th>
              <th>Outcome</th>
              {/* <th>Balance</th> */}
            </tr>
          </thead>
          <tbody>
            {createList.map((val) => {
              return (
                <tr key={val.trs_id}>
                  <td>{val.name_from}</td>
                  <td>{val.name_to}</td>
                  <td>{val.trs_inc}</td>
                  <td>{val.trs_out}</td>
                  {/* <td>{val.balance}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="select_buttons">
          <button
            type="button"
            className="btn btn-outline-light add"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <FontAwesomeIcon icon={faPlus} size="3x" color="#60C6D8" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light add"
            data-toggle="modal"
            data-target="#exampleModalCenter2"
          >
            <FontAwesomeIcon icon={faMinus} size="3x" color="#60C6D8" />
          </button>
        </div>
      </div>
      {/* ---------- MODAL ---------------- */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalCenterTitle">
                Your new event...
              </h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h2>Income</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="from" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="from"
                    name="fromName"
                    aria-describedby="fromHelp"
                    placeholder="From"
                    onChange={(e) => {
                      setFromName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="to" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="to"
                    name="toName"
                    aria-describedby="toHelp"
                    placeholder="To"
                    onChange={(e) => {
                      setToName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="trsInc" className="form-label"></label>
                  <input
                    type="number"
                    className="form-control"
                    id="trsInc"
                    name="trsInc"
                    aria-describedby="toHelp"
                    placeholder="Ammount"
                    onChange={(e) => {
                      setTrsInc(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={submitOperationInc}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalCenter2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="exampleModalCenterTitle">
                Your new event...
              </h6>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h2>Outcome</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="from" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="from"
                    name="fromName"
                    aria-describedby="fromHelp"
                    placeholder="From"
                    onChange={(e) => {
                      setFromName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="to" className="form-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="to"
                    name="toName"
                    aria-describedby="toHelp"
                    placeholder="To"
                    onChange={(e) => {
                      setToName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="trsOut" className="form-label"></label>
                  <input
                    type="number"
                    className="form-control"
                    id="trsOut"
                    name="trsOut"
                    aria-describedby="toHelp"
                    placeholder="Ammount"
                    onChange={(e) => {
                      setTrsOut(e.target.value);
                    }}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={submitOperationOut}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {<ReactBootStrap.Spinner animation="grow" variant="secondary" />} */}
      {/* <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} //3 secs
 
      /> */}
    </div>
    // </BrowserRouter>
  );
  //   }
}

// export default Main;
export default Main;
