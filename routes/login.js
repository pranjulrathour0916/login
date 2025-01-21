const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const myText = "Pranjul@";

// Create User using POST method ./ccreateuser

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("phone").isLength({min : 10, max : 10})
  ],
  async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send("Please Enter the correct credentials");
    } else {
      const existUser = await Users.findOne({ email: req.body.email });
      if (existUser) {
        res.send("User already exist");
      } else {
        const user = await Users.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
          phone : req.body.phone
        });
        const data = {
          user: user.id,
        };
        const auth_token = jwt.sign(data, myText);
        console.log(auth_token);
        res.json(auth_token);
      }
    }
  } 
);

// Login user using POST method

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const { password, email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).send("Please enter the correct creds");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      res.status(400).send("Plese enter the correct creds");
    } else {
      const data = {
        user: user.id,
      };
      const auth_token = jwt.sign(data, myText);
      res.json(user);
    }
  }
);

// Getting User details using POST method

router.post("/getuser", fetchuser, async (req, res) => {
  const userId = req.user;
  const user = await Users.findById(userId).select("-password");
  console.log("login", user.phone);
  res.send(user);
});

module.exports = router;
