const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // fetch user data
    let { username, age, email, password } = req.body;

    // check if the user email is already registered
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // register the user and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let createdUser = await userModel.create({
          username,
          age,
          email,
          password: hash,
        });

        // create jwt token
        let token = jwt.sign(
          { email: createdUser.email, id: createdUser._id },
          "secret",
          { expiresIn: "24h" }
        );
        res.cookie("token", token);

        // send successful response
        res.status(200).json({
          success: true,
          data: createdUser,
          message: "Registration Successful",
        });
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Something went wrong!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // fetch user data
    let { email, password } = req.body;

    // check if the user email exists
    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // check if the password is correct
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        // create jwt token
        let token = jwt.sign({ email: user.email, id: user._id }, "secret", {
          expiresIn: "24h",
        });

        res.cookie("token", token);

        // user.token = token;
        user.password = undefined;

        // send successful response
        res.status(200).json({
          success: true,
          data: user,
          message: `Login Successful, Welcome ${user.username}`,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Something went wrong!",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", "");
    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Something went wrong!",
    });
  }
};
