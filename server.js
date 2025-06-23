require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");


const app = express();
const PORT= process.env.PORT || 5000;

//Middlewares
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+ "/public/html/index.html");
});

app.use(cors());//frontend and backend ko jordne ka kaam
app.use(express.json());
app.use(session({
    secret: "bookreviewsecret",
    resave: false,
    saveUninitialized:true
}))

//Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes=require("./routes/reviewRoutes");

app.use("/api/auth",authRoutes);
app.use("/api/book",bookRoutes);
app.use("/api/review",reviewRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on Port: ${PORT}`);
})