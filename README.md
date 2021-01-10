# my-finance

!['Sign-Up-Flow'](https://cdn1.savepice.ru/uploads/2021/1/10/6d7543772360f23ac5036274aed4a8f3-full.png)

# 1. Installation instructions

    Clone or download the repository
    Open Terminal and change directory to stay in '\my-finance\my-finance-app>' and run 'npm init' in the CLI.
    Run 'npm run start' in the CLI.
    Also You need to start server: Go to '\my-finance\server>' and run 'npm run devStart' in the CLI.

---

## 2. Timeframe (How many days?)

## 10 days.

## 3. Overview (Что это для чего кому кто пользуется)

#### I created this application for my father-in-law, who needs a simple phone application to track finances for every day.

---

## 4. Technologies:

### Front end:

    JavaScript, HTML, CSS, Bootsrap, Fontawesome, React.js, Webpack, Axios.

#### Stack of used packages:

```
{
  "name": "my-finance-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^1.2.32",
    "@fortawesome/free-brands-svg-icons": "^5.15.1",
    "@fortawesome/free-regular-svg-icons": "^5.15.1",
    "@fortawesome/free-solid-svg-icons": "^5.15.1",
    "@fortawesome/react-fontawesome": "^0.1.14",
    "@testing-library/jest-dom": "^5.11.8",
    "@testing-library/react": "^11.2.2",
    "@testing-library/user-event": "^12.6.0",
    "axios": "^0.21.1",
    "bootstrap": "^4.5.3",
    "chart.js": "^2.9.4",
    "react": "^17.0.1",
    "react-bootstrap": "^1.4.3",
    "react-chartist": "^0.14.3",
    "react-chartjs-2": "^2.11.1",
    "react-dom": "^17.0.1",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.1",
    "web-vitals": "^0.2.4"
  },
```

#### react-router:

```
import { BrowserRouter, Route } from "react-router-dom";

<BrowserRouter>
  <Route path="/start">
    <div className="App">
      <Start />
    </div>
  </Route>
</BrowserRouter>
```

#### Spiner:

```
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
```

#### Axios:

```
useEffect(() => {
    Axios.get("http://localhost:5000/transactions").then((response) => {
      getList(response.data);
      console.log(response.data);
    });
}, []);
```

#### GET Updated balance on each operation:

```
  useEffect(() => {
    Axios.get("http://localhost:5000/balance").then((response) => {
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
```

#### Use Hooks:

```
  const [toName, setToName] = useState("");
  const [trsInc, setTrsInc] = useState("");
  const [trsOut, setTrsOut] = useState("");
  const [createList, getList] = useState([]);
```

#### Use In/Out for Chart graphic:

```
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
```

#### Post Transacion to DataBase:

```
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
```

#### React Charts:

```
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
```

#### Created Transaction Table from DataBase:

```
<tbody>
  {createList.map((val) => {
    return (
      <tr key={val.trs_id}>
        <td>{val.name_from}</td>
        <td>{val.name_to}</td>
        <td>{val.trs_inc}</td>
        <td>{val.trs_out}</td>
      </tr>
    );
  })}
</tbody>
```

#### Route Link to Month/Week/Day
```
<Link
    to="/monthly"
    style={{ textDecoration: "none" }}
    className="Login__button"
>
```
---
### Back end:

    Node.js, Express.

#### Stack of used packages:
```
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "devStart": "nodemon server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.6"
  }
}
```

#### Connection queries:
```
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "**********",
  database: "finance_proj",
});
connection.connect((err) => {
  if (!err) {
    console.log("Success");
  } else {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("Listen 5000");
});
```

#### GET request:
```
app.get("/transactions", (req, res) => {
  const sqlGetTrns =
    "SELECT trs_id, name_from, name_to, trs_inc, trs_out, balance FROM transaction";
  connection.query(sqlGetTrns, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});
```

#### POST request:
```
app.post("/transactions", (req, res) => {
  const name_from = req.body.fromName;
  const name_to = req.body.toName;
  const trs_inc = req.body.trsInc;
  const trs_out = req.body.trsOut;
  const balance = req.body.balance;
  const sqlInsertTrns =
    "INSERT INTO transaction(name_from, name_to, trs_inc, trs_out, balance) VALUES(?, ?, ?, ?, ?);";
  connection.query(
    sqlInsertTrns,
    [name_from, name_to, trs_inc, trs_out, balance],
    (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    }
  );
});
```

#### DELETE request:
```
app.delete("/monthly/:trs_id", (req, res) => {
  const trs_id = req.params.trs_id;
  const sqlDelete = "DELETE FROM transaction WHERE trs_id = ?";
  connection.query(sqlDelete, trs_id, (err, res) => {
    if (!err) {
      console.log(res);
    } else {
      console.log(err);
    }
  });
});
```

### DataBase:

    MySQL.

#### Table on DataBase:
```
CREATE TABLE transaction(
	trs_id INT PRIMARY KEY AUTO_INCREMENT,
    name_from VARCHAR(100),
    name_to VARCHAR(100),
    trs_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    trs_inc INT,
    trs_out INT,
    balance INT
);
```

#### Request from Server to GET balance:
```
SELECT 
    transaction.trs_id,
    transaction.trs_inc,
    transaction.trs_out,
    @balance := @balance + transaction.trs_inc - transaction.trs_out AS balance
FROM transaction, (SELECT @balance := 0) AS variableInit
ORDER BY transaction.trs_id ASC
```

## 5. API Endpoint Documentation (api/transaction - Methods : Get, Post И так далее)

---

## 6. Wireframes или Figma или Design

---

# 7. Pages (Main (лого поля логин и регитсрация), Monthly Daily диаграмма, таблица и фунциональность добавить + - транзации)

---

## 8. Final Product

---

## 9. How to improve the application and what to add (как улучшить приложение и что добавить)
