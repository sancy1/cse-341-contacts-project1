const Contact = require('../models/Contact');

// I added this Helper function to validate request body
const validateRequestBody = (req, res, requiredFields = []) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body cannot be empty!",
      example: {
        firstName: "San",
        lastName: "Ceey",
        email: "san.ceey@example.com",
        favoriteColor: "Blue",
        birthday: "1990-01-01"
      }
    });
  }

  if (requiredFields.length > 0) {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
        example: {
          firstName: "San",
          lastName: "Ceey",
          email: "san.ceey@example.com",
          favoriteColor: "Blue",
          birthday: "1990-01-01"
        }
      });
    }
  }

  return null;
};

// ---------------------------------------------------------------------
/**
 * Get all contacts
 * @route GET /api/contacts
 * @returns {Object[]} contacts - List of all contacts.
 */
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------
/**
 * Get a single contact by ID
 * @route GET /api/contacts/:id
 * @param {string} id - The ID of the contact to retrieve.
 * @returns {Object} contact - The contact object.
 */
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------
/**
 * Create a new contact
 * @route POST /api/contacts
 * @param {Object} body - The contact data to create.
 * @param {string} body.firstName - The first name of the contact.
 * @param {string} body.lastName - The last name of the contact.
 * @param {string} body.email - The email address of the contact.
 * @param {string} [body.favoriteColor] - The favorite color of the contact.
 * @param {Date} [body.birthday] - The birthday of the contact.
 * @returns {Object} contact - The newly created contact object.
 */
const createContact = async (req, res) => {
  const validationError = validateRequestBody(req, res, ['firstName', 'lastName', 'email']);
  if (validationError) return validationError;

  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------
/**
 * Update a contact by ID
 * @route PUT /api/contacts/:id
 * @param {string} id - The ID of the contact to update.
 * @param {Object} body - The updated contact data.
 * @param {string} [body.firstName] - The updated first name of the contact.
 * @param {string} [body.lastName] - The updated last name of the contact.
 * @param {string} [body.email] - The updated email address of the contact.
 * @param {string} [body.favoriteColor] - The updated favorite color of the contact.
 * @param {Date} [body.birthday] - The updated birthday of the contact.
 * @returns {Object} contact - The updated contact object.
 */
const updateContact = async (req, res) => {
  const validationError = validateRequestBody(req, res);
  if (validationError) return validationError;

  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------
/**
 * Delete a contact by ID
 * @route DELETE /api/contacts/:id
 * @param {string} id - The ID of the contact to delete.
 * @returns {Object} message - A success message.
 */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------
/**
 * Partially update a contact by ID
 * @param {string} id - The ID of the contact to update
 * @param {Object} req.body - The fields to update
 * @returns {Object} The updated contact
 */
const patchContact = async (req, res) => {
  const validationError = validateRequestBody(req, res);
  if (validationError) return validationError;

  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the contact by ID and update only the provided fields
    const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Export 
module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  patchContact,
};