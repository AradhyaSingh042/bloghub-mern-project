const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    // extract the jwt token
    let { token } = req.cookies;

    // verify if the token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing Token",
      });
    }
    const decode = jwt.verify(token, "secret");

    req.user = decode;
    next();
  } catch (e) {
    console.error(e);
    res.status(400).json({
      success: false,
      error: e.message,
      message: "Invalid Token Response",
    });
  }
};
