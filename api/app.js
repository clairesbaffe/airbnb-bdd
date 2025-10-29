const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://admin:password@127.0.0.1:5432/airbnb");

const express = require("express");
const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur le http://${hostname}:${port}`);
});

// db.one("SELECT $1 AS value", 123)
//   .then((data) => {
//     console.log("DATA:", data.value);
//   })
//   .catch((error) => {
//     console.log("ERROR:", error);
//   });
