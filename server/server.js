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
  password: "P@ssw0rdv@",
  database: "finance_proj",
});
connection.connect((err) => {
  if (!err) {
    console.log("Success");
  } else {
    console.log(err);
  }
});

/**
 * ############### TRANSACTIONS #############
 */

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

/**
 * ################ BALANCE ################
 */

app.get("/balance", (req, res) => {
  const sqlGetTrns =
    "SELECT trs_id, trs_inc, trs_out, @balance := @balance + transaction.trs_inc - transaction.trs_out AS balance FROM transaction, (SELECT @balance := 0) AS variableInit ORDER BY transaction.trs_id ASC";
  connection.query(sqlGetTrns, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});

/**
 * ############ INCOME/OUTCOME #############
 */

app.get("/incomeSum", (req, res) => {
  const sqlGetInc =
    "SELECT @trs_inc := SUM(trs_inc) AS trs_inc FROM transaction;";
  connection.query(sqlGetInc, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});
app.get("/outcomeSum", (req, res) => {
  const sqlGetOut =
    "SELECT @trs_out := SUM(trs_out) AS trs_out FROM transaction;";
  connection.query(sqlGetOut, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});

/**
 * ################ DAILY #################
 */

app.get("/daily", (req, res) => {
  const sqlGetTrns =
    "SELECT  trs_id, name_from, name_to, trs_inc, trs_out, @trs_date := DATE_FORMAT(trs_date, '%d/%m/%y') AS trs_date, balance FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 DAY );";
  connection.query(sqlGetTrns, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);outcomeSum
    }
  });
});
// app.get("/balance/daily", (req, res) => {
//   const sqlGetTrns =
//     "SELECT trs_id, trs_inc, trs_out, trs_date @balance := @balance + transaction.trs_inc - transaction.trs_out AS balance FROM transaction, (SELECT @balance := 0) AS variableInit ORDER BY transaction.trs_id ASC";
//   connection.query(sqlGetTrns, (err, data) => {
//     if (!err) {
//       res.json(data);
//     } else {
//       console.log(err);
//     }
//   });
// });
app.get("/incomeSum/daily", (req, res) => {
  const sqlGetInc =
    "SELECT @trs_inc := SUM(trs_inc) AS trs_inc FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 DAY );";
  connection.query(sqlGetInc, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});
app.get("/outcomeSum/daily", (req, res) => {
  const sqlGetOut =
    "SELECT @trs_out := SUM(trs_out) AS trs_out FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 DAY );";
  connection.query(sqlGetOut, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});

/**
 * ################# WEEKLY ################
 */

app.get("/weekly", (req, res) => {
  const sqlGetTrns =
    "SELECT  trs_id, name_from, name_to, trs_inc, trs_out, @trs_date := DATE_FORMAT(trs_date, '%d/%m/%y') AS trs_date, balance FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 WEEK );";
  connection.query(sqlGetTrns, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});
// app.get("/balance/weekly", (req, res) => {
//   const sqlGetTrns =
//     "SELECT trs_id, trs_inc, trs_out, trs_date @balance := @balance + transaction.trs_inc - transaction.trs_out AS balance FROM transaction, (SELECT @balance := 0) AS variableInit ORDER BY transaction.trs_id ASC";
//   connection.query(sqlGetTrns, (err, data) => {
//     if (!err) {
//       res.json(data);
//     } else {
//       console.log(err);
//     }
//   });
// });
app.get("/incomeSum/weekly", (req, res) => {
  const sqlGetInc =
    "SELECT @trs_inc := SUM(trs_inc) AS trs_inc FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 WEEK );";
  connection.query(sqlGetInc, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});
app.get("/outcomeSum/weekly", (req, res) => {
  const sqlGetOut =
    "SELECT @trs_out := SUM(trs_out) AS trs_out FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 WEEK );";
  connection.query(sqlGetOut, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});

/**
 * ############## MONTHLY #############
 */

app.get("/monthly", (req, res) => {
  const sqlGetTrns =
    "SELECT  trs_id, name_from, name_to, trs_inc, trs_out, @trs_date := DATE_FORMAT(trs_date, '%d/%m/%y') AS trs_date, balance FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 MONTH );";
  connection.query(sqlGetTrns, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});

// app.get("/balance/month", (req, res) => {
//   const sqlGetTrns =
//     "SELECT trs_id, trs_inc, trs_out, trs_date @balance := @balance + transaction.trs_inc - transaction.trs_out AS balance FROM transaction, (SELECT @balance := 0) AS variableInit ORDER BY transaction.trs_id ASC";
//   connection.query(sqlGetTrns, (err, data) => {
//     if (!err) {
//       res.json(data);
//     } else {
//       console.log(err);
//     }
//   });
// });
app.get("/incomeSum/month", (req, res) => {
  const sqlGetInc =
    "SELECT @trs_inc := SUM(trs_inc) AS trs_inc FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 MONTH );";
  connection.query(sqlGetInc, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});
app.get("/outcomeSum/month", (req, res) => {
  const sqlGetOut =
    "SELECT @trs_out := SUM(trs_out) AS trs_out FROM transaction WHERE trs_date >= DATE_SUB( CURDATE(), INTERVAL 1 MONTH );";
  connection.query(sqlGetOut, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});

/**
 * ############### Delete ################
 */
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

/**
 * ################ USERS ###############
 */

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM user", (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
    }
  });
});
app.post("/users", (req, res) => {
  const user_name = req.body.userName;
  const user_lastname = req.body.userLastName;
  const user_mail = req.body.userMail;
  const user_birthday = req.body.userBirthday;
  const passw = req.body.userPassword;
  const sqlInsertUser =
    "INSERT INTO user(user_name, user_lastname, user_mail, user_birthday, passw) VALUES(?, ?, ?, ?, ?);";
  connection.query(
    sqlInsertUser,
    [user_name, user_lastname, user_mail, user_birthday, passw],
    (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Listen 5000");
});
