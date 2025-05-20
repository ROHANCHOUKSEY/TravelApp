const express = require("express");

const hostRouter = express.Router();

const hostController = require("../Controller/HostController");

hostRouter.post("/", hostController.postLocation);
hostRouter.get("/", hostController.getLocation);
hostRouter.get("/edit/:id", hostController.getEditLocation);
hostRouter.post("/edit/:id", hostController.postEditLocation);

module.exports = hostRouter;