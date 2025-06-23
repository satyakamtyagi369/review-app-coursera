const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    const authHeader = req.headers["authorization"];//Request ke headers se "authorization" header nikala.
    const token= authHeader?.split(" ")[1];
    if(!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
        if(err){
            return res.sendStatus(403); // forbidden.
        }
        req.user = user;
        next();
    });
};