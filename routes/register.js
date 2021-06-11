
const User = require("../models/User");

const { check, validationResult } = require("express-validator");

const validators = [
  check("name", "invalid name").isEmail(),
  check("password", "invalid password").isLength({ min: 4})
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
    const candidate = await User.findOne({name});
    if (candidate) {
      return res.status(400).json({
        ok: false,
        message: "user already exists",
      });
    }

    const user = new User({name, password, roles: ["User"]});
    await user.save();
    return res.status(201).json({
      ok: true,
      message: "register success"
    });
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false,
      message: "register error",
      error: { name, message }
    });
  }
});

module.exports = router;
