const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
// Why use cookieParser? ↓
app.use(cookieParser());

//database connection
mongoose
  .connect(process.env.secretUrl)
  .then(() =>
    app.listen("3000", () => console.log("database and server running!"))
  )
  .catch((error) => () => console.log(error));

//Routes
const expenseRoute = require("./routes/expenseRout");
const userRoute = require("./routes/userRoute");

app.use(expenseRoute);
app.use(userRoute);
