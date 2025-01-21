const express = require("express");
const router = express.Router();
const Details = require("../models/Details");
const Recipient = require("../models/Recipient");
const { body, validationResult } = require("express-validator");

router.post(
  "/send/:phone",
  [body("name").exists(), body("chats").isLength({ min: 1 })],
  async (req, res) => {
    const result = validationResult(req);
    const phone_num = req.params.phone;
    const check = Recipient.findOne({phone_num});
    if(check){
      
    }
    if (!result) {
      res.status(400).send("Please enter something");
    } else {
      const chat = await Details.create({
        name: req.body.name,
        chats: req.body.chats,
        phone : phone_num
      });
      console.log(chat)
      res.json(chat);
    }
  }
);

module.exports = router