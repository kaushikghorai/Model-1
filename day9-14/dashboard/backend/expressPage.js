const express = require('express');
const app = express();
const path = require('path');

const staticpath = path.join(__dirname, "/public");
app.use(express.static(staticpath));

app.get("/", (req, res)=>{
    res.send("<h1 style='background: #00ffff; color: #ff0000;'>Welcome in Home Page.</h1><nav><a href='/'>Home</a> <a href='/about'>About</a> <a href='signup'>SingUp</a></nav><h2>Welcome</h2>");
});

app.get("/about", (req, res)=>{
    res.send("<h1 style='background: #00ffff; color: #ff0000;'>Welcome in Home Page.</h1><nav><a href='/'>Home</a> <a href='/about'>About</a> <a href='signup'>SingUp</a></nav><h2>This is a About page. Thanks for exploring. Have a great Learning</h2>");
});

app.get("/signup", (req, res)=>{
    res.send("<h1 style='background: #00ffff; color: #ff0000;'>Welcome in Home Page.</h1><nav><a href='/'>Home</a> <a href='/about'>About</a> <a href='signup'>SingUp</a></nav><h2>This is signup page.</h2>");
});

app.get("/netflix", (req, res)=>{
    res.send("<h1 style='background: #00ffff; color: #ff0000;'>Welcome in Home Page.</h1><nav><a href='/'>Home</a> <a href='/about'>About</a> <a href='signup'>SingUp</a></nav><h2>Your have lost your path please go through the navigation.");
});

app.listen(5500);
