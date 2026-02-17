const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Email id is not Valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Give a Strong Password");
  }
};

module.exports = { validateSignupData };
