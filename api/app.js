const express = require("express");
const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());

const userRouter = require("./routes/users.routes");

app.use("/users", userRouter);

app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur le http://${hostname}:${port}`);
});

