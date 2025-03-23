// const mongoose = require('mongoose');

// /**
//  * My Contact Schema Description
//  * @typedef {Object} Contact
//  * @property {string} firstName - The first name of the contact.
//  * @property {string} lastName - The last name of the contact.
//  * @property {string} email - The email address of the contact (I made this unique by setting it to true).
//  * @property {string} favoriteColor - The favorite color of the contact.
//  * @property {Date} birthday - The birthday of the contact.
//  */
// // Contact Schema
// const contactSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   favoriteColor: { type: String },
//   birthday: { type: Date }
// });

// module.exports = mongoose.model('Contact', contactSchema);






const mongoose = require('mongoose');

/**
 * My Contact Schema Description
 * @typedef {Object} Contact
 * @property {string} firstName - The first name of the contact.
 * @property {string} lastName - The last name of the contact.
 * @property {string} email - The email address of the contact (I made this unique by setting it to true).
 * @property {string} favoriteColor - The favorite color of the contact.
 * @property {Date} birthday - The birthday of the contact.
 * @property {mongoose.Schema.Types.ObjectId} user - The reference to the User who owns this contact.
 */
// Contact Schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favoriteColor: { type: String },
  birthday: { type: Date },

  user: { 
    type: String, // Changed to String
    required: true 
}

});

module.exports = mongoose.model('Contact', contactSchema);
