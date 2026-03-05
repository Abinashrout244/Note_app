const { User } = require("../models/user.model");
const { OAuth2Client } = require("google-auth-library");
const { validateSignupData } = require("../utils/validateData");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, about } = req.body;
    if (!firstName || !emailId || !password) {
      return res.status(400).json({ message: "Feild Must Be Required" });
    }
    validateSignupData(req);

    const existingUser = await User.findOne({ emailId: emailId });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists!!" });
    }

    const hashPassword = await User.getHashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      about,
    });

    const token = await user.getAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({ message: "User Register Succesfully", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const findUser = await User.findOne({ emailId: emailId }).select(
      "+password",
    );

    if (!findUser) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isPassword = await findUser.comparePassword(password);
    if (!isPassword) {
      return res.status(404).json({ message: "invalid Credenitials" });
    }

    const token = await findUser.getAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({ message: "User LogedIn Sucessfully", token, findUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ emailId: email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        firstName: given_name,
        lastName: family_name,
        emailId: email,
        photoURL: picture,
      });
    }

    const token = await user.getAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({
      success: true,
      message: "Google Login Successful",
      user,
    });
  } catch (err) {
    console.log("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.getUser;
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const profileEdit = async (req, res) => {
  try {
    const logedinUser = req.getUser;

    const updateData = await User.findByIdAndUpdate(
      { _id: logedinUser._id },
      req.body,
      { returnDocument: "after", runValidators: true },
    );

    if (!updateData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Keep both keys for compatibility with existing clients.
    res.status(200).json({
      message: "Update Successfully",
      user: updateData,
      updateData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const sendResetOtp = async (req, res) => {
  try {
    console.log("🔥 sendResetOtp called");

    const { emailId } = req.body;

    const user = await User.findOne({ emailId });
    //console.log("User found:", user);

    if (!user) {
      return res.json({
        message: "If email exists, OTP sent successfully",
      });
    }

    if (user.provider === "google") {
      return res.status(400).json({
        message: "This account uses Google login. Password reset not allowed",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    user.resetPasswordOtp = hashedOtp;
    user.resetPasswordOtpExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL}>`,
      to: user.emailId,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    console.log("✅ Mail sent:", info.response);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const verifyOtpAndReset = async (req, res) => {
  try {
    const { emailId, otp, newPassword } = req.body;

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      emailId: emailId, // ✅ fixed
      resetPasswordOtp: hashedOtp,
      resetPasswordOtpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }
    if (user.provider === "google") {
      return res.status(400).json({
        message: "This account uses Google login. Password reset not allowed",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.log("RESET ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { _id } = req.getUser; // from auth middleware
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(_id).select("+password");

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.provider === "google") {
      return res.status(400).json({
        message: "This account uses Google login. Password reset not allowed",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  profileEdit,
  googleLogin,
  sendResetOtp,
  verifyOtpAndReset,
  changePassword,
};
