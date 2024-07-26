const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

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
  .connect("mongodb://localhost:27017/expenses")
  .then(() =>
    app.listen("3000", () => console.log("database and server running!"))
  )
  .catch((error) => () => console.log(error));

//Routes
const expenseRoute = require("./routes/expenseRout");
const userRoute = require("./routes/userRoute");

app.use(expenseRoute);
app.use(userRoute);

// const PORT = 2000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
