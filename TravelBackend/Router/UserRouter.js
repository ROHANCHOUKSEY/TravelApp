const express = require("express");

const userRouter = express.Router();

const userController = require("../Controller/UserController");

userRouter.post("/", userController.postFavourite);
userRouter.get("/favourites", userController.getFavourites);
userRouter.delete("/favourites/:id", userController.deleteFavourites);
userRouter.get("/details/:id", userController.getDetails);
userRouter.post("/reviewpost/:id", userController.reviewPost);
userRouter.get("/reviewpost/:id", userController.reviewGet);

module.exports = userRouter;  