const express = require("express");

const userRouter = express.Router();

const userController = require("../Controller/UserController");

userRouter.post("/", userController.postFavourite);
userRouter.get("/favourites", userController.getFavourites);
userRouter.delete("/favourites/:id", userController.deleteFavourites);

module.exports = userRouter;