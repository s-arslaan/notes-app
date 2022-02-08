const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

// Create User using: POST "api/auth/createUser" NO LOGIN REQUIRED
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
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // checking if email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists!" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }

    // .then((user) => res.json(user))
    // .catch((err) => {
    //   console.log(err);
    //   res.json({ error: "Please enter unique email!", message: err.message });
    // });
  }
);

module.exports = router;
