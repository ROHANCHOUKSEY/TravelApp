const express = require("express");

const authRouter = express.Router();

const authController = require("../Controller/AuthController");

authRouter.post("/signup", authController.postSignUp);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;

  