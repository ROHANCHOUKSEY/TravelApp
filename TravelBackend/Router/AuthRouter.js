const express = require("express");

const authRouter = express.Router();

const authController = require("../Controller/AuthController");

authRouter.post("/signup", authController.postSignUp);
authRouter.post("/login", authController.postLogin);
authRouter.get("/session", (req, res) => {
  if (req.session.isLoggined) {
    res.status(200).json({ isLoggined: true, user: req.session.user }); 
  } else {
    res.status(200).json({ isLoggined: false });
  }
});
authRouter.post("/logout", authController.postLogout);
authRouter.post("/screenmode", authController.postScreenmode);
authRouter.get("/screenmode", authController.getScreenmode);

module.exports = authRouter;
 
  