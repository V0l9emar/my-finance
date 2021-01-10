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
      <Route path="/login">
        <div className="App">
          <Login />
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

## (опсисать и приложить часть кода и обьяснить что этот делает и лоя чего он (как запрос обрабатиываеться, где храняться данные, как эти данные передаюьбся в таблицу и в график)),

### Back end:

    Node.js, Express, MySQL.

## (База данных (немного кода как создали и какие есть колонки и строки и для чего они), Server (как создали и какие есть Endpoints (get/ delete/ put/ update)-> приложить часть кода (как обрабатывали на севрере запрос get или delete))) )

## 5. API Endpoint Documentation (api/transaction - Methods : Get, Post И так далее)

---

## 6. Wireframes или Figma или Design

---

# 7. Pages (Main (лого поля логин и регитсрация), Monthly Daily диаграмма, таблица и фунциональность добавить + - транзации)

---

## 8. Final Product

---

## 9. How to improve the application and what to add (как улучшить приложение и что добавить)
