const { mongo, default: mongoose } = require("mongoose");

const mongoURI = process.env.MONGOGB_URI

async function connetToMongo() {
    await mongoose.connect(mongoURI)
    console.log("Connected to mongo")
}

module.exports = connetToMongo;