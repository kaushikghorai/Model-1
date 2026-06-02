const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch(err => console.error("Error connecting to MongoDB:", err));
