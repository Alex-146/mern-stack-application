
const jwt = require("jsonwebtoken");

const { secret } = require("../config/jwt");

module.exports = (req, res, next) => {

  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "no token"
      });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  }
  catch(error) {
    const { name, message } = error;
    return res.status(401).json({
      ok: false,
      message: "verify error",
      error: { name, message }
    });
  }

}
