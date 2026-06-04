const express = require('express');
const cors = require('cors');
const path = require('path');
const { user_model } = require('./db/user.js');

// Connect to MongoDB
require('./db/config.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Enable JSON body parsing for incoming requests

const staticpath = path.join(__dirname, "/public");
app.use(express.static(staticpath));

app.get("/", (req, res) => {
    res.send("<head><link rel='stylesheet' href='/express.css'></head><h1>Welcome in Home Page.</h1><nav><a href='/'>Home</a> <a href='/about'>About</a> <a href='/signup'>Sign Up</a></nav><h2>Welcome</h2>");
});

app.get("/about", (req, res) => {
    res.send("<head><link rel='stylesheet' href='/express.css'></head><h1>Welcome in Home Page.</h1><nav><a href='/'>Home</a> <a href='/about'>About</a> <a href='/signup'>Sign Up</a></nav><h2>This is a About page. Thanks for exploring. Have a great Learning</h2>");
});

// Changed signup from GET to POST for security and standard practices
app.post("/signup", async (req, res) => {
    try {
        console.log("Signup Request Received: ", req.body);
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const user = new user_model(req.body);
        const result = await user.save();
        
        // Hide password from response output for security
        const responseData = result.toObject();
        delete responseData.password;
        
        res.status(201).json(responseData);
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal Server Error during registration" });
    }
});

app.get("/show", async (req, res) => {
    try {
        const users = await user_model.find();
        res.json(users);
    } catch (error) {
        console.error("Show Users Error:", error);
        res.status(500).json({ error: "Internal Server Error while fetching users" });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await user_model.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error during deletion" });
    }
});

app.get("/netflix", (req, res) => {
    res.send("<head><link rel='stylesheet' href='/express.css'></head><h1>Welcome in Home Page.</h1><nav><a href='/'>Home</a> <a href='/about'>About</a> <a href='/signup'>Sign Up</a></nav><h2>You have lost your path please go through the navigation.</h2>");
});

app.listen(5500, () => {
    console.log("Express backend running at http://localhost:5500");
});
