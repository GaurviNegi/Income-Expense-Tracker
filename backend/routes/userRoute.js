const express = require("express");
const userController = require("../controller/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const userRouter = express.Router();

//!register
userRouter.post("/register",userController.register);
//!login
userRouter.post("/login",userController.login);
//!profile
userRouter.get("/profile",isAuthenticated , userController.profile);
//!change password 
userRouter.put("/change-user-password",isAuthenticated , userController.changeUserPassword);
//!update user profile 
userRouter.put("/update-user-profile",isAuthenticated , userController.updateUserProfile);
module.exports = userRouter