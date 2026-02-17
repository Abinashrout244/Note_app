const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const authMiddleware = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      return res.status(401).json({ message: "Cookies Not found ! Plz Login" });
    }

    const decodeData = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodeData;

    const getUser = await User.findById({ _id });
    if (!getUser) {
      return res.status(404).json({ message: "user Not found" });
    }

    req.getUser = getUser;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token Expired or Not found" });
  }
};

module.exports = { authMiddleware };
