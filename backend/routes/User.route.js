const express = require("express");
const userRoute = express.Router();
const auth = require("../auth");
const userController = require("../controller/userController");

userRoute.post("/register", userController.registerNewUser);
userRoute.post("/login", userController.loginUser);
userRoute.get("/me", auth, userController.getUserDetails);

module.exports = userRoute;
