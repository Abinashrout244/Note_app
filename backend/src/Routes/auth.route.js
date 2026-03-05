const express = require("express");
const authRouter = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  profileEdit,
  googleLogin,
  sendResetOtp,
  verifyOtpAndReset,
  changePassword,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

authRouter.post("/signup", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/google-login", googleLogin);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/profile", authMiddleware, getUser);
authRouter.put("/profile-edit", authMiddleware, profileEdit);
authRouter.put("/change-password", authMiddleware, changePassword);
authRouter.post("/forgot-password", sendResetOtp);
authRouter.post("/reset-password", verifyOtpAndReset);

module.exports = authRouter;
