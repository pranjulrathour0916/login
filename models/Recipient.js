const mongoose = require('mongoose');
const Users = require('./Users');
const {Schema} = mongoose

const messageSchema = new Schema({
    messages :{
        type : [String],
        required : true
    },
    date : {
        type : Date,
        default : Date.now,
        get: (date) => date.toISOString().split("T")[0]
    },
    sendername : {
        type : String
    }
})
const recipientSchema = new Schema({

    name :{
        type : String,
        
    },
    phone : {
        type : Number,
        required : true,
    },
    messages : {
        type : [messageSchema],
        required : true,
        default : []
    },
    date : {
        type : Date,
        dafault :  Date.now,  
    },
    logUser : {
        type : mongoose.Schema.Types.Number,
        ref : 'Users'
    }
    
});

module.exports = mongoose.model("recipients", recipientSchema);