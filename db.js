const { mongo, default: mongoose } = require("mongoose");

const mongoURI = "mongodb://localhost:27017/Login"

async function connetToMongo() {
    await mongoose.connect(mongoURI)
    console.log("Connected to mongo")
}

module.exports = connetToMongo;