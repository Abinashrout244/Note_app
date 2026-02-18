const { User } = require("../models/user.model");
const { validateSignupData } = require("../utils/validateData");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
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
    });

    const token = await user.getAuthToken();

    res.cookie("token", token);

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

    res.cookie("token", token);

    res.json({ message: "User LogedIn Sucessfully", token, findUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, { maxAge: 0 });
    res.json({ success: true, message: "Logout Sucessfully" });
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

module.exports = { registerUser, loginUser, logoutUser, getUser };
