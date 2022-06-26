const { validateEmail } = require("../helpers/validation");
const { validateLength } = require("../helpers/validation");
const { validateUsername } = require("../helpers/validation");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    //Check if valid email
    if (!validateEmail(email)) {
      res.status(400).json({
        message: "invalod email address",
      });
    }

    //Check if email is unique
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email already exists. Try with a different email address",
      });
    }

    //Check first name length
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "First name should be between 3 and 30 characters long",
      });
    }

    //Check last name length
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Last name should be between 3 and 30 characters long",
      });
    }

    //Check password  length
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password should be between 6 and 40 characters long",
      });
    }

    //Encrypt the password
    const cryptedPassword = await bcrypt.hash(password, 12);

    //Validate username
    let temp_username = first_name + last_name;
    let newUsername = await validateUsername(temp_username);
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    //Send email verifications
    const emailVerififcationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
