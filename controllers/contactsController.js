// const asyncHandler = require("express-async-handler");
// const contactService = require("../services/contactService");

// // Get all contacts
// const getAllContacts = asyncHandler(async (req, res) => {
//   const contacts = await contactService.getAllContacts();
//   res.status(200).json(contacts);
// });

// // Get a contact by ID
// const getContactById = asyncHandler(async (req, res) => {
//   const contact = await contactService.getContactById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(contact);
// });

// // Create a new contact
// const createContact = asyncHandler(async (req, res) => {
//   const newContact = await contactService.createContact(req.body);
//   res.status(201).json(newContact);
// });

// // Update a contact (PUT)
// const updateContact = asyncHandler(async (req, res) => {
//   const updatedContact = await contactService.updateContact(req.params.id, req.body);
//   if (!updatedContact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(updatedContact);
// });

// // Partially update a contact (PATCH) - No validation applied
// const patchContact = asyncHandler(async (req, res) => {
//   const updatedContact = await contactService.updateContact(req.params.id, req.body);
//   if (!updatedContact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(updatedContact);
// });

// // Delete a contact
// const deleteContact = asyncHandler(async (req, res) => {
//   const deletedContact = await contactService.deleteContact(req.params.id);
//   if (!deletedContact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json({ message: "Contact deleted successfully" });
// });

// module.exports = {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContact,
//   deleteContact,
//   patchContact,
// };

















// const asyncHandler = require("express-async-handler");
// const contactService = require("../services/contactService");

// // Get all contacts for the authenticated user
// const getAllContacts = asyncHandler(async (req, res) => {
//   const userId = req.user._id; // Authenticated user's ID
//   const contacts = await contactService.getAllContacts(userId);
//   res.status(200).json(contacts);
// });

// // Get a contact by ID for the authenticated user
// const getContactById = asyncHandler(async (req, res) => {
//   const userId = req.user._id; // Authenticated user's ID
//   const contact = await contactService.getContactById(req.params.id, userId);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(contact);
// });



// // Create a new contact for the authenticated user
// const createContact = asyncHandler(async (req, res) => {
//   console.log("User in request:", req.user); // Debugging

//   const userId = req.user.userId; // Use correct key
//   if (!userId) {
//     return res.status(401).json({ message: "Unauthorized: User not found" });
//   }

//   const contactData = { ...req.body, user: userId }; // Assign user ID
//   console.log("Contact Data:", contactData); // Debugging

//   const newContact = await contactService.createContact(contactData);
//   res.status(201).json(newContact);
// });


// // Update a contact (PUT) for the authenticated user
// const updateContact = asyncHandler(async (req, res) => {
//   const userId = req.user._id; // Authenticated user's ID
//   const updatedContact = await contactService.updateContact(req.params.id, req.body, userId);
//   if (!updatedContact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(updatedContact);
// });

// // Partially update a contact (PATCH) for the authenticated user
// const patchContact = asyncHandler(async (req, res) => {
//   const userId = req.user._id; // Authenticated user's ID
//   const updatedContact = await contactService.patchContact(req.params.id, req.body, userId); // Use patchContact instead of updateContact
//   if (!updatedContact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json(updatedContact);
// });

// // Delete a contact for the authenticated user
// const deleteContact = asyncHandler(async (req, res) => {
//   const userId = req.user._id; // Authenticated user's ID
//   const deletedContact = await contactService.deleteContact(req.params.id, userId);
//   if (!deletedContact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   res.status(200).json({ message: "Contact deleted successfully" });
// });

// module.exports = {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContact,
//   patchContact,
//   deleteContact,
// };


























const mongoose = require('mongoose'); 
const asyncHandler = require("express-async-handler");
const contactService = require("../services/contactService");

// Get all contacts for the authenticated user
const getAllContacts = asyncHandler(async (req, res) => {
  const userId = req.user.userId; // Use correct key
  const contacts = await contactService.getAllContacts(userId);
  res.status(200).json(contacts);
});

// Get a contact by ID for the authenticated user
const getContactById = asyncHandler(async (req, res) => {
  const userId = req.user.userId; // Use correct key
  const contact = await contactService.getContactById(req.params.id, userId);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// Create a new contact for the authenticated user
const createContact = asyncHandler(async (req, res) => {
  console.log("User in request:", req.user); // Debugging

  const userId = req.user.userId; // Use correct key
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  const contactData = { ...req.body, user: userId }; // Assign user ID
  console.log("Contact Data:", contactData); // Debugging

  const newContact = await contactService.createContact(contactData);
  res.status(201).json(newContact);
});

// Update a contact (PUT) for the authenticated user
const updateContact = asyncHandler(async (req, res) => {
  const userId = req.user.userId; // Use correct key
  const updatedContact = await contactService.updateContact(req.params.id, req.body, userId);
  if (!updatedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(updatedContact);
});


// Partially update a contact (PATCH) for the authenticated user
const patchContact = asyncHandler(async (req, res) => {
  const userId = req.user.userId; // Use correct key
  const updatedContact = await contactService.patchContact(req.params.id, req.body, userId);
  if (!updatedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(updatedContact);
});


// Delete a contact for the authenticated user
const deleteContact = asyncHandler(async (req, res) => {
  const userId = req.user.userId; // Use correct key
  const deletedContact = await contactService.deleteContact(req.params.id, userId);
  if (!deletedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  patchContact,
  deleteContact,
};
