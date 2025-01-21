const connetToMongo = require("./db")
const express = require("express")
var cors = require('cors')

const app = express()
app.use(cors())
const port = 5000
app.use(express.json()) 
connetToMongo();

app.listen(port, ()=>{
    console.log(`App is listening to port ${port}`)
})

app.use("/api/auth", require("./routes/login"));
app.use("/api/chats",require("./routes/chats"));
app.use("/api/user", require("./routes/sender"))

