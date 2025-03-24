
const mongoose = require('mongoose');


// Contact Schema --------------------------------------------------------------
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favoriteColor: { type: String },
  birthday: { type: Date },

  user: { 
    type: String, 
    required: true 
}

});

module.exports = mongoose.model('Contact', contactSchema);
