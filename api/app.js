require('dotenv').config();

const express = require("express");
const app = express();
const hostname = process.env.HOST;
const port = process.env.PORT;

app.use(express.json());

const userRouter = require("./routes/users.routes");
const ratingRouter = require("./routes/ratings.routes");
const roleRouter = require("./routes/roles.routes");

app.use("/users", userRouter);
app.use("/ratings", ratingRouter);
app.use("/roles", roleRouter);

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur le http://${hostname}:${port}`);
});