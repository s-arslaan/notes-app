const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "#arslaan#";

// ROUTE 1: Create User using: POST "api/auth/createUser" NO LOGIN REQUIRED
router.post(
  "/createUser",
  [
    body("name", "Name too short!").isLength({ min: 3 }),
    body("email", "Invalid email!").isEmail(),
    body("password", "Invalid password length!")
      .trim()
      .isLength({ min: 7, max: 16 }),
  ],
  async (req, res) => {

    // error message sending
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // if there are errors, send Bad request and errors
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, error: "User already exists!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData)
      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }

    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "Please enter unique email!", message: err.message });
    // });
  }
);

// ROUTE 2: Authentication User using: POST "api/auth/login" NO LOGIN REQUIRED
router.post(
  "/login",
  [
    body("email", "Invalid email!").isEmail(),
    body("password", "Password can't be blank!").exists(),
  ],
  async (req, res) => {
    // error message sending
    // if there are errors, send Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          // .status(400)
          .json({ success: false, error: "Invalid Credentials (user !exists ) !" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          // .status(400)
          .json({ success: false, error: "Invalid Credentials (invalid password) !" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData)
      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin User details using: POST "api/auth/getuser" LOGIN REQUIRED
router.post("/getuser", fetchuser, async (req, res) => {
  // error message sending
  // if there are errors, send Bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
