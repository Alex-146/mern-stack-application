
const User = require("../models/User");

const jwt = require("jsonwebtoken");

const { secret } = require("../config/jwt");

const { check, validationResult } = require("express-validator");

const validators = [
  check("name", "invalid name").normalizeEmail().isEmail(),
  check("password", "invalid password").exists()
]

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     ok: false,
    //     message: "request errors",
    //     errors
    //   });
    // }

    const { name, password } = req.body;
    const user = await User.findOne({name});
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "user not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        ok: false,
        message: "wrong password",
      });
    }

    const payload = {
      id: user.id, 
      roles: user.roles
    };

    const accessToken = jwt.sign(payload, secret, { expiresIn: "1h" });

    return res.status(200).json({
      ok: true,
      message: "login success",
      accessToken,
      id: user.id
    });
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false,
      message: "login error",
      error: { name, message }
    });
  }
});

module.exports = router;
