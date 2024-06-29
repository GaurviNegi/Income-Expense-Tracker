const express = require("express");
const categoryController = require("../controller/categoryController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const categoryRouter = express.Router();

//!create category
categoryRouter.post("/create", isAuthenticated , categoryController.add);
//!list category
categoryRouter.get("/lists", isAuthenticated , categoryController.lists);
//!update category 
categoryRouter.put("/update/:id", isAuthenticated , categoryController.update);
//!delete category 
categoryRouter.delete("/delete/:id", isAuthenticated , categoryController.delete);


module.exports = categoryRouter