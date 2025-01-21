const express = require("express");
const router = express.Router();
const Recipient = require("../models/Recipient");
const Details = require("../models/Details")
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Users = require("../models/Users");

// Adding a user in application using POST method

router.post(
  "/recipient",
  [body("name").exists(), body("phone").isLength({ min: 10, max: 10 })],
  async (req, res) => {
    const recipient = await Recipient.create({
      name: req.body.name,
      phone: req.body.phone,
    });
    res.json(recipient);
    console.log(recipient);
  }
);

// Fecthing user details from phone number using GET mehtod and from Params

router.get("/getuser/:phone", async (req, res) => {
  const phone = req.params.phone;
  const user = await Recipient.findOne({ phone });
  res.json(user);
  console.log(user.name)
  const data = user.messages.forEach((msg) => {
    console.log("this is meessage", msg.messages);
    let dd = msg.date;
    console.log("Date :-",dd)
  });
});

// Fetch all the chats from user using Phone number and POST method

router.put("/messages/:phone", async (req, res) => {
  const phone = req.params.phone;
  let msg = req.body.messages;
  const newMessage = await Recipient.findOneAndUpdate(
    { phone: phone },
    { $push: { messages: { messages: msg } } },
    { new: true }
  );

  res.send("success");
});

router.get ('/alldetails/:userPhone', async (req, res)=>{
  const userPhoneno = req.params.userPhone;
  console.log(userPhoneno)
  let allData = await Recipient.findOne({userPhoneno})
  res.send(allData);
  console.log(allData)
})

router.post(
  "/recipient/:userphn",
  [body("name").exists(), body("phone").isLength({ min: 10, max: 10 })],
  async (req, res) => {
    const userphn = req.params.userphn
    const user_num = await Users.findOne({phone : userphn}).select("-password")
    console.log(user_num)
    const recipient = await Recipient.create({
      name: req.body.name,
      phone: req.body.phone,
      logUser : user_num
    });
    res.json(recipient);
    console.log(recipient);
  }
);



module.exports = router;
