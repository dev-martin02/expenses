const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(
  cors({
    origin: "https://expenses-frontend-kohl.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
// Why use cookieParser? ↓
app.use((req, res, next) => {
  res.cookie("_vercel_sso_nonce", "someValue", {
    sameSite: "None",
    secure: true,
    httpOnly: true,
  });
  next();
});
//database connection
mongoose
  .connect(process.env.secretUrl)
  .then(() =>
    app.listen("3000", () => console.log("database and server running!"))
  )
  .catch((error) => () => console.log(error));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://expenses-frontend-kohl.vercel.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//Routes
const expenseRoute = require("./routes/expenseRout");
const userRoute = require("./routes/userRoute");

app.use(expenseRoute);
app.use(userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
