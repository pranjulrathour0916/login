const express = require("express");
const router = express.Router();
const Recipient = require("../models/Recipient");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Users = require("../models/Users");

// create and check a recipient to whom wants to send the messgae required phone number and name in application using POST method

router.post(
  "/recipient/",
  [body("name").exists(), body("phone").isLength({ min: 10, max: 10 })],
  fetchuser,
  async (req, res) => {
    const { phone } = req.body.phone;
    console.log("this is user", req.body);
    console.log("backreacp", phone);
    const checkRecp = await Recipient.findOne({
      $and: [{ logUser: req.user }, { phone: req.body.phone }],
    });
    console.log(checkRecp);
    if (checkRecp) {
      res.send("User already exist");
    } else {
      console.log("inside else");
      const recipient = await Recipient.create({
        name: req.body.name,
        phone: req.body.phone,
        logUser: req.user,
      });
      const user = await Users.findOne({phone : req.user})
      if(!user){
        console.log("User with this number doesn't exist wanna send an Invite ")
      }
      else{
      const recipient2 = await Recipient.create({
        name : user.name,
        phone : req.user,
        logUser : req.body.phone
      })}
      res.json(recipient);
      console.log(recipient, recipient2);
    }
  }
);

// Fetching all users for the logged in User

router.get("/fetchallmsgs", fetchuser, async (req, res) => {
  const allMsg = await Recipient.find({ logUser: req.user });
  res.json(allMsg);
});

// Sending the messages to the recp with logged user
router.post(
  "/sendmsg/:recphn",
  [body("message").exists()],
  fetchuser,
  async (req, res) => {
    const message = req.body.message;
    const recPhn = req.params.recphn;
    const sender = req.user;
    const user = await Users.findOne({phone : sender})
    const recp = await Recipient.findOne({ logUser: sender, phone: recPhn })
    const findRecp = await Recipient.findOneAndUpdate(
        { logUser: sender, phone: recPhn },
      { $push: { messages: { messages: message,sendername : recp.name }}},
      
      { new: true }
    );
    const findRecp2 = await Recipient.findOneAndUpdate(
        { logUser: recPhn, phone: sender },
        { $push: { messages: { messages: message, sendername : user.name },  }},
      { new: true }
    );
    
    res.json(findRecp);
  }
);

// Fetch all the messages for the particular recipient

router.get("/fetchrecpmsg/:recphn", fetchuser, async (req, res) => {
  const recphn = req.params.recphn;
  const fetchMsg = await Recipient.find(
      { logUser: req.user, phone: recphn },
  );
  res.json(fetchMsg);
});

// Delete the msgs from particular user 

router.get("/deletemsg/:recphn/:id", fetchuser, async (req, res) => {
  const id = req.params.id
  const msg = await Recipient.findOneAndUpdate(
    {logUser: req.user, phone: req.params.recphn},
    {$pull : {messages : {_id : id}}},
    {new : true}
  );
 res.json(msg)

});

module.exports = router;
