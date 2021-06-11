
const Promocode = require("../models/Promocode");
const { v4: uuidv4 } = require("uuid");
const verifyToken = require("../middleware/auth");
const router = require("express").Router();

router.get("/generate", verifyToken, async (req, res) => {
  
  try {
    const id = req.user.id;

    const value = uuidv4().toUpperCase();
    const promocode = new Promocode({ value, owner: id});

    await promocode.save();

    return res.status(201).json({
      ok: true,
      message: "promocode generated",
      value: promocode
    });
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false,
      message: "generate error",
      error: { name, message }
    });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const id = req.user.id;
    const promocodes = await Promocode.find({ owner: id });

    return res.json({
      ok: true,
      message: "get all",
      value: promocodes
    });
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false,
      message: "get by id error",
      error: { name, message }
    });
  }
});

router.get("/all/", verifyToken, async (req, res) => {
  try {
    const promocodes = await Promocode.find();

    return res.json({
      ok: true,
      message: "get all",
      value: promocodes
    });
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false,
      message: "get by id error",
      error: { name, message }
    });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const promocode = await Promocode.findById(id);

    return res.json({
      ok: true,
      message: "get by id",
      value: promocode
    });
  }
  catch(error) {
    const { name, message } = error;
    return res.status(500).json({
      ok: false,
      message: "get by id error",
      error: { name, message }
    });
  }
});

module.exports = router;
