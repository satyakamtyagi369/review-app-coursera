const users = require("../models/users");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = (req,res)=>{
    const {username,password}=req.body; // html ka data extract karega.
    const userexist = users.find(u=>u.username===username);
    if(userexist){ // user pehle exists toh nahi karta yeh check karna.
        return res.status(400).json({message:"User Exists."}); // 400: Bad Requests.
    }
    const hashed= bcrypt.hashSync(password,8);//here 8 is salt rounds, means 8 times encrypt karega.
    users.push({username,password:hashed});
    res.status(201).json({message:"Registered Successfully."});// 201: Created successfully.
}

exports.login = (req,res)=>{
    const {username,password}= req.body;
    const user = users.find(u=>u.username===username);
    if(!user || !bcrypt.compareSync(password,user.password)){
        return res.status(401).json({message:"Invalid Credentials."});//401: Unauthorized means login fail
    }
    const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({token});
};




