const express = require("express");

const hostRouter = express.Router();

const hostController = require("../Controller/HostController");

hostRouter.post("/", hostController.postLocation);
hostRouter.get("/", hostController.getLocation);
hostRouter.get("/hostLocation", hostController.getHostLocation);
hostRouter.get("/edit/:id", hostController.getEditLocation);
hostRouter.post("/edit/:id", hostController.postEditLocation);
hostRouter.delete("/:id", hostController.deleteLocation);
hostRouter.post("/stateLocation", hostController.postStateLocation);
hostRouter.get("/stateLocation", hostController.getStateLocation);

module.exports = hostRouter;  