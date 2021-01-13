import React, { useState, useEffect } from "react";
import "./Daily.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


function Daily() {

  const [showDaily, getDaily] = useState([]);
//   const [showWeekBalance, getShowDailyBalance] = useState("");
  const [showSumIncome, setShowSumIncome] = useState("");
  const [showSumOut, setShowSumOut] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/daily").then((response) => {
      getDaily(response.data);
    });
  }, []);
//   useEffect(() => {
//     Axios.get("http://localhost:5000/balance/daily").then((response) => {
//       //   getBalance(response.data.reduce((a, b) => a+b));
//       let res;
//       let dataFrom = response.data;
//       let idx = dataFrom.length - 1;
//       if (idx === -1) {
//         res = 0;
//       } else {
//         res = dataFrom[idx].balance;
//       }
//       getShowDailyBalance(res);
//     });
//   }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/incomeSum/daily").then((response) => {
      let income = response.data;
      income.map((val) => {
        let incomeSumVal = val.trs_inc;
        setShowSumIncome(incomeSumVal);
      });
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:5000/outcomeSum/daily").then((response) => {
      let outcome = response.data;
      outcome.map((val) => {
        let outcomeSumVal = val.trs_out;
        setShowSumOut(outcomeSumVal);
      });
    });
  }, []);

  const deleteTrns = (id_trs) => {
    Axios.delete(`http://localhost:5000/monthly/${id_trs}`);
    console.log(id_trs);
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
    <div className="Daily">
      <div className="Daily__header">
        <Link
          to="/weekly"
          style={{ textDecoration: "none" }}
          className="Daily__button"
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" color="#60C6D8" />
        </Link>
        <h1>Daily</h1>
        <Link
          to="/monthly"
          style={{ textDecoration: "none" }}
          className="Daily__button"
        >
          <FontAwesomeIcon
          icon={faChevronCircleRight}
          size="2x"
          color="#60C6D8"
        />
        </Link>
      </div>
      <Doughnut data={data} />
      <div className="Daily__table">
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Income</th>
              <th>Outcome</th>
              <th>Date</th>
              <th>D</th>
            </tr>
          </thead>
          <tbody>
            {showDaily.map((val) => {
              return (
                <tr key={val.trs_id}>
                  <td>{val.name_from}</td>
                  <td>{val.name_to}</td>
                  <td>{val.trs_inc}</td>
                  <td>{val.trs_out}</td>
                  <td className="Monthly__table-date">{val.trs_date}</td>
                  <td
                    className="no__border"
                    onClick={() => {
                      deleteTrns(val.trs_id);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size="1x"
                      color="#c750a3"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="Daily__butt">
        <Link
          to="/main"
          style={{ textDecoration: "none" }}
          className="Daily__button"
        >
          {/* <button>Let's start</button> */}
          <button type="button" className="btn btn-primary">
            Back to Main
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Daily;
