const express = require("express");
const router = express.Router();
const Recipient = require("../models/Recipient");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// create and check a recipient to whom wants to send the messgae required phone number and name in application using POST method

router.post(
  "/recipient/",
  [body("name").exists(), body("phone").isLength({ min: 10, max: 10 })],fetchuser,
  async (req, res) => {
    const { phone } = req.body;
    const checkRecp = await Recipient.findOne({ phone: phone });
    if (checkRecp) {
      res.send("User already exist");
    } else {
      const recipient = await Recipient.create({
        name: req.body.name,
        phone: req.body.phone,
        logUser : req.user
      });
      res.json(recipient);
      console.log(recipient);
    }
  }
);

router.get("/fetchallmsgs", fetchuser, async (req, res) => {
  const allMsg = await Recipient.find({logUser : req.user})
  res.json(allMsg);
})

router.post("/sendmsg/:recphn", 
  [body("message").exists()], fetchuser, async (req, res) =>{
    const message = req.body.message;
    const recPhn = req.params.recphn;
    const sender = req.user;
    const findRecp = await Recipient.findOneAndUpdate({logUser : sender, phone : recPhn },
      { $push: { messages: { messages: message } } },
      {new : true}
    )
    res.json(findRecp)
  }
)



module.exports = router;
