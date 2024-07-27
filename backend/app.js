const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(
  cors({
    origin: "https://main--friendly-bombolone-b19b9a.netlify.app/",
    credentials: true,
  })
);

app.use(express.json());
// Why use cookieParser? ↓
app.use(cookieParser());
//database connection
mongoose
  .connect(process.env.secretUrl)
  .catch((error) => () => console.log(error));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Routes
const expenseRoute = require("./routes/expenseRout");
const userRoute = require("./routes/userRoute");

app.use(expenseRoute);
app.use(userRoute);
