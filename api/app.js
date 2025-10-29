require('dotenv').config();

// const MongoClient = require('mongodb').MongoClient

const express = require("express");
const app = express();
const hostname = process.env.HOST;
const port = process.env.PORT;

app.use(express.json());

const userRouter = require("./routes/users.routes");

app.use("/users", userRouter);

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


// MongoClient.connect('mongodb://airbnb-mongodb:27017/animals', (err, client) => {
//   if (err) throw err

//   const db = client.db('animals')

//   db.collection('mammals').find().toArray((err, result) => {
//     if (err) throw err

//     console.log(result)
//   })
// })