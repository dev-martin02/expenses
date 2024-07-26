const expensesControllers = require("../controllers/expensesCont");
const express = require("express");
const route = express.Router();
const { requireAuth } = require("../middleware/authentication");

// route.use(requireAuth);

route.get("/", requireAuth, expensesControllers.showExpense);
route.post("/", requireAuth, expensesControllers.addExpense);
// route.post("/moneyAmount", requireAuth, expensesControllers.moneyAmountLeft);

module.exports = route;
