// const Contact = require("../models/Contact");

// // Create a new contact
// const createContact = async (contactData) => {
//   return await Contact.create(contactData);
// };

// // Get all contacts
// const getAllContacts = async () => {
//   return await Contact.find();
// };

// // Get a contact by ID
// const getContactById = async (id) => {
//   return await Contact.findById(id);
// };

// // Update a contact
// const updateContact = async (id, updates) => {
//   return await Contact.findByIdAndUpdate(id, updates, { new: true });
// };

// // Delete a contact
// const deleteContact = async (id) => {
//   return await Contact.findByIdAndDelete(id);
// };

// module.exports = {
//   createContact,
//   getAllContacts,
//   getContactById,
//   updateContact,
//   deleteContact,
// };


















const Contact = require("../models/Contact");

// Create a new contact for the authenticated user
const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

// Get all contacts for the authenticated user
const getAllContacts = async (userId) => {
  return await Contact.find({ user: userId }); // Filter contacts by user ID
};

// Get a contact by ID for the authenticated user
const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, user: userId }); // Ensure the contact belongs to the user
};

// Update a contact for the authenticated user
const updateContact = async (id, updates, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: id, user: userId }, // Ensure the contact belongs to the user
    updates,
    { new: true } // Return the updated document
  );
};


// Update specific fields of a contact for the authenticated user
const patchContact = async (id, updates, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: id, user: userId }, // Ensure the contact belongs to the user
    { $set: updates }, // Only update provided fields
    { new: true, runValidators: true } // Return updated document & validate new values
  );
};

// Delete a contact for the authenticated user
const deleteContact = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, user: userId }); // Ensure the contact belongs to the user
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  patchContact,
};