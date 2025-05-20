const express = require("express");

const hostRouter = express.Router();

const hostController = require("../Controller/HostController");

hostRouter.post("/", hostController.postLocation);
hostRouter.get("/", hostController.getLocation);
hostRouter.get("/edit/:id", hostController.editLocation);

module.exports = hostRouter;