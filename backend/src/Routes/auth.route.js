const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  profileEdit,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/profile", authMiddleware, getUser);
authRouter.put("/profile-edit", authMiddleware, profileEdit);

module.exports = authRouter;
