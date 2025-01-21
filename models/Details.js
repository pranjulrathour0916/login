const mongoose = require('mongoose')
const {Schema} = mongoose
const deatilsSchema = new Schema({

    name :{
        type : String,
        required : true
    },
    chats : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        dafault :  Date.now,  
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
});

module.exports = mongoose.model("details", deatilsSchema);