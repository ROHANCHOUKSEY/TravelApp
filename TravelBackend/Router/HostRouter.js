const express = require("express");

const hostRouter = express.Router();

const hostController = require("../Controller/HostController");

hostRouter.post("/", hostController.postLocation);
hostRouter.get("/", hostController.getLocation);

module.exports = hostRouter;