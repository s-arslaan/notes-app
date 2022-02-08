const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

// Create User using: POST "api/auth/" Doesn't require auth
router.post(
  "/",
  [
    body("name", "Name too short!").isLength({ min: 3 }),
    body("email", "Invalid email!").isEmail(),
    body("password", "Invalid password length!").trim().isLength({ min: 7, max: 16 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "Please enter unique email!", message: err.message });
      });
  }
);

module.exports = router;
