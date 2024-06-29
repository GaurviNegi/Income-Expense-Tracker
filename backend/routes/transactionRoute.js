const express = require("express");
const transactionController = require('../controller/TransactionController');
const isAuthenticated = require("../middlewares/isAuthenticated");
const transactionRouter = express.Router();

//!create category
transactionRouter.post("/create", isAuthenticated , transactionController.create);
//!list category
transactionRouter.get("/lists", isAuthenticated , transactionController.getFilteredTransactions);

transactionRouter.put("/update/:id", isAuthenticated , transactionController.updateTransaction);

transactionRouter.delete("/delete/:id", isAuthenticated , transactionController.deleteTransaction);

module.exports = transactionRouter;