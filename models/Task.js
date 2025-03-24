const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


// Task Schema --------------------------------------------------------------
const TaskSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },

  user: { 
    type: String, 
    required: true },
    
}, 
    { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema); 