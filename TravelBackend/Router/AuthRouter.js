const express = require("express");

const authRouter = express.Router();

const authController = require("../Controller/AuthController");

authRouter.post("/", authController.postAuth);

module.exports = authRouter;

