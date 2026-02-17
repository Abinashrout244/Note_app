const express = require("express");
const DBConnection = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./Routes/auth.route");

app.use("/api/auth", authRouter);

DBConnection()
  .then(() => {
    console.log("DB connection establish Perfectly");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server Connection Establish Perfectly");
    });
  })
  .catch((err) => {
    console.log("mongo db connection Not establish");
  });
