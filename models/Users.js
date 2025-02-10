const mongoose = require('mongoose');
const Recipient = require('./Recipient');
const {Schema} = mongoose
const UserSchema = new Schema({

    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
            type : String,
            require : true
        },
    phone : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model("Users", UserSchema);