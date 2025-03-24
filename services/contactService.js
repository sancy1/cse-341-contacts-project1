
const Contact = require("../models/Contact");


// Create a new contact for the authenticated user -------------------------------------------------------------- 
const createContact = async (contactData) => {
  try {
    const contact = await Contact.create(contactData);
    return contact;
  } catch (error) {
    console.error("Error creating contact:", error); // Loging the error for debugging
    throw new Error("Failed to create contact");
  }
};


// Get all contacts for the authenticated user --------------------------------------------------------------
const getAllContacts = async (userId) => {
  try {
    const contacts = await Contact.find({ user: userId }); 
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error); // Loging the error for debugging
    throw new Error("Failed to fetch contacts");
  }
};


// Get a contact by ID for the authenticated user --------------------------------------------------------------
const getContactById = async (id, userId) => {
  try {
    const contact = await Contact.findOne({ _id: id, user: userId }); 
    if (!contact) {
      const error = new Error("Contact not found");
      error.statusCode = 404; 
      throw error;
    }
    return contact;
  } catch (error) {
    console.error("Error fetching contact by ID:", error); // Loging the error for debugging
    throw error; 
  }
};


// Update a contact for the authenticated user  --------------------------------------------------------------
const updateContact = async (id, updates, userId) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, user: userId }, 
      updates,
      { new: true } 
    );

    if (!contact) {
      const error = new Error("Contact not found");
      error.statusCode = 404; 
      throw error;
    }

    return contact;
  } catch (error) {
    console.error("Error updating contact:", error); // Loging the error for debugging
    throw error; 
  }
};


// Update specific fields of a contact for the authenticated user --------------------------------------------------------------
const patchContact = async (id, updates, userId) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, user: userId }, 
      { $set: updates }, 
      { new: true, runValidators: true } 
    );

    if (!contact) {
      const error = new Error("Contact not found");
      error.statusCode = 404; 
      throw error;
    }

    return contact;
  } catch (error) {
    console.error("Error patching contact:", error); 
    throw error; 
  }
};


// Delete a contact for the authenticated user --------------------------------------------------------------
const deleteContact = async (id, userId) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: id, user: userId }); 

    if (!contact) {
      const error = new Error("Contact not found");
      error.statusCode = 404; 
      throw error;
    }

    return contact;
  } catch (error) {
    console.error("Error deleting contact:", error); // Loging the error for debugging
    throw error; 
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  patchContact,
  deleteContact,
};

































// const Contact = require("../models/Contact");

// // Create a new contact for the authenticated user
// const createContact = async (contactData) => {
//   return await Contact.create(contactData);
// };

// // Get all contacts for the authenticated user
// const getAllContacts = async (userId) => {
//   return await Contact.find({ user: userId }); 
// };

// // Get a contact by ID for the authenticated user
// const getContactById = async (id, userId) => {
//   return await Contact.findOne({ _id: id, user: userId }); // Ensure the contact belongs to the user
// };

// // Update a contact for the authenticated user
// const updateContact = async (id, updates, userId) => {
//   return await Contact.findOneAndUpdate(
//     { _id: id, user: userId }, // Ensure the contact belongs to the user
//     updates,
//     { new: true } // Return the updated document
//   );
// };


// // Update specific fields of a contact for the authenticated user
// const patchContact = async (id, updates, userId) => {
//   return await Contact.findOneAndUpdate(
//     { _id: id, user: userId }, // Ensure the contact belongs to the user
//     { $set: updates }, // Only update provided fields
//     { new: true, runValidators: true } // Return updated document & validate new values
//   );
// };

// // Delete a contact for the authenticated user
// const deleteContact = async (id, userId) => {
//   return await Contact.findOneAndDelete({ _id: id, user: userId }); // Ensure the contact belongs to the user
// };

// module.exports = {
//   createContact,
//   getAllContacts,
//   getContactById,
//   updateContact,
//   deleteContact,
//   patchContact,
// };