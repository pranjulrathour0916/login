const jwt = require('jsonwebtoken');
const myText = "Pranjul@";

const fetchuser = (req, res, next)=>{
    try {
        const token = req.header("auth-token")
    if(!token){
        res.status(401).send("Please enter the correct creds")
    }
    const data = jwt.verify(token, myText);
    req.user = data.user
    next()
    } catch (error) {
        console.error(error.message)
        res.status(401).send("Invalid token")
    }
}

module.exports = fetchuser;