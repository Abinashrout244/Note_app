const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/profile", authMiddleware, getUser);

module.exports = authRouter;
