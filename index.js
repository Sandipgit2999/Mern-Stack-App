const express = require("express");
require("dotenv").config();
const PORT = 8080 || process.env.PORT;
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { authorization } = require("./middlewares/Authorization");
const { UserController } = require("./routes/user.route");
const { TodosController } = require("./routes/todo.route");

app.use(cors());
app.use(express.json());

app.use("/user", UserController);
app.use(authorization);
app.use("/todos", TodosController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connection established");
    console.log(`running on port ${PORT}`);
  } catch (err) {
    console.log("something went wrong");
    console.log(err);
  }
});
