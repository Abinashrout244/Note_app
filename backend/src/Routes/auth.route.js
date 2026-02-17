const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);

module.exports = authRouter;
