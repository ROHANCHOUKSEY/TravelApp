const express = require("express");

const userRouter = express.Router();

const userController = require("../Controller/UserController");

userRouter.post("/", userController.postFavourite);
userRouter.get("/favourites", userController.getFavourites);
userRouter.delete("/favourites/:id", userController.deleteFavourites);
userRouter.get("/details/:id", userController.getDetails);

module.exports = userRouter;