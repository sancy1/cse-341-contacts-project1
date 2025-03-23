
// const express = require("express");
// const router = express.Router();
// const {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContact,
//   deleteContact,
//   patchContact,
// } = require("../controllers/contactsController");

// /**
//  * @route GET /contacts
//  * @summary Get all contacts
//  * @tags Contacts
//  * @returns {Array<Contact>} 200 - List of contacts
//  * @returns {Error} 500 - Internal server error
//  */
// router.get("/", getAllContacts);

// /**
//  * @route GET /contacts/{id}
//  * @summary Get a single contact by ID
//  * @tags Contacts
//  * @param {string} id.path.required - ID of the contact to retrieve
//  * @returns {Contact} 200 - Contact details
//  * @returns {Error} 404 - Contact not found
//  * @returns {Error} 500 - Internal server error
//  */
// router.get("/:id", getContactById);

// /**
//  * @route POST /contacts
//  * @summary Create a new contact
//  * @tags Contacts
//  * @param {Contact} request.body.required - Contact data to create
//  * @returns {Contact} 201 - Created contact
//  * @returns {Error} 400 - Invalid input
//  * @returns {Error} 500 - Internal server error
//  */
// router.post("/", createContact);

// /**
//  * @route PUT /contacts/{id}
//  * @summary Update a contact by ID
//  * @tags Contacts
//  * @param {string} id.path.required - ID of the contact to update
//  * @param {Contact} request.body.required - Updated contact data
//  * @returns {Contact} 200 - Updated contact
//  * @returns {Error} 404 - Contact not found
//  * @returns {Error} 400 - Invalid input
//  */
// router.put("/:id", updateContact);

// /**
//  * @route PATCH /contacts/{id}
//  * @summary Partially update a contact by ID
//  * @tags Contacts
//  * @param {string} id.path.required - ID of the contact to update
//  * @param {object} request.body.required - Fields to update
//  * @returns {Contact} 200 - Updated contact
//  * @returns {Error} 404 - Contact not found
//  * @returns {Error} 400 - Invalid input
//  */
// router.patch("/:id", patchContact);

// /**
//  * @route DELETE /contacts/{id}
//  * @summary Delete a contact by ID
//  * @tags Contacts
//  * @param {string} id.path.required - ID of the contact to delete
//  * @returns {object} 200 - Success message
//  * @returns {Error} 404 - Contact not found
//  * @returns {Error} 500 - Internal server error
//  */
// router.delete("/:id", deleteContact);

// module.exports = router;








// // routes/contact.js
// const express = require("express");
// const router = express.Router();
// const { contactValidationRules } = require("../validators/contactValidator");
// const validate = require("../middlewares/validate");
// const { protect, isAdmin } = require('../middlewares/auth');
// const {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContact,
//   deleteContact,
//   patchContact,
// } = require("../controllers/contactsController");


// /**
//  * @swagger
//  * /contacts:
//  *   get:
//  *     summary: Get all contacts
//  *     responses:
//  *       200:
//  *         description: List of all contacts
//  */
// router.get("/", protect, getAllContacts);

// /**
//  * @swagger
//  * /contacts/{id}:
//  *   get:
//  *     summary: Get a single contact by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the contact to retrieve
//  *     responses:
//  *       200:
//  *         description: Contact details
//  *       404:
//  *         description: Contact not found
//  */
// router.get("/:id", protect, getContactById);

// /**
//  * @swagger
//  * /contacts:
//  *   post:
//  *     summary: Create a new contact
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               firstName:
//  *                 type: string
//  *               lastName:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               favoriteColor:
//  *                 type: string
//  *               birthday:
//  *                 type: string
//  *                 format: date
//  *     responses:
//  *       201:
//  *         description: Contact created successfully
//  *       400:
//  *         description: Invalid input
//  */
// router.post("/", protect, contactValidationRules(), validate, createContact);

// /**
//  * @swagger
//  * /contacts/{id}:
//  *   put:
//  *     summary: Update a contact by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the contact to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               firstName:
//  *                 type: string
//  *               lastName:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               favoriteColor:
//  *                 type: string
//  *               birthday:
//  *                 type: string
//  *                 format: date
//  *     responses:
//  *       200:
//  *         description: Contact updated successfully
//  *       404:
//  *         description: Contact not found
//  *       400:
//  *         description: Invalid input
//  */
// router.put("/:id", protect, contactValidationRules(), validate, updateContact);

// /**
//  * @swagger
//  * /contacts/{id}:
//  *   patch:
//  *     summary: Partially update a contact by ID
//  *     description: Update specific fields of a contact without modifying other fields.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the contact to update
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               firstName:
//  *                 type: string
//  *               lastName:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               favoriteColor:
//  *                 type: string
//  *               birthday:
//  *                 type: string
//  *                 format: date
//  *     responses:
//  *       200:
//  *         description: Contact updated successfully
//  *       404:
//  *         description: Contact not found
//  *       400:
//  *         description: Invalid input
//  */
// router.patch('/:id', protect, patchContact);

// /**
//  * @swagger
//  * /contacts/{id}:
//  *   delete:
//  *     summary: Delete a contact by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID of the contact to delete
//  *     responses:
//  *       200:
//  *         description: Contact deleted successfully
//  *       404:
//  *         description: Contact not found
//  */
// router.delete("/:id", protect, deleteContact);

// module.exports = router;





















const express = require("express");
const router = express.Router();
const { contactValidationRules } = require("../validators/contactValidator");
const validate = require("../middlewares/validate");
const { protect, isAdmin } = require('../middlewares/auth');
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  patchContact,
} = require("../controllers/contactsController");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     oAuthSample:  # Arbitrary name for the security scheme
 *       type: oauth2
 *       description: This API uses OAuth 2.0 with the implicit grant flow.
 *       flows:
 *         implicit:  # OAuth flow (authorizationCode, implicit, password, or clientCredentials)
 *           authorizationUrl: https://api.example.com/oauth2/authorize  # Replace with your authorization URL
 *           scopes:
 *             read_contacts: Read contact information
 *             write_contacts: Modify contact information
 *     bearerAuth:  # Bearer Authentication
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Optional, for documentation purposes
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     security:
 *       - oAuthSample:  # Apply OAuth 2.0 security
 *         - read_contacts  # Required scope
 *       - bearerAuth: []  # Apply Bearer Authentication
 *     responses:
 *       200:
 *         description: List of all contacts
 */
router.get("/", protect, getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     security:
 *       - oAuthSample:  # Apply OAuth 2.0 security
 *         - read_contacts  # Required scope
 *       - bearerAuth: []  # Apply Bearer Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to retrieve
 *     responses:
 *       200:
 *         description: Contact details
 *       404:
 *         description: Contact not found
 */
router.get("/:id", protect, getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     security:
 *       - oAuthSample:  # Apply OAuth 2.0 security
 *         - write_contacts  # Required scope
 *       - bearerAuth: []  # Apply Bearer Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", protect, contactValidationRules(), validate, createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     security:
 *       - oAuthSample:  # Apply OAuth 2.0 security
 *         - write_contacts  # Required scope
 *       - bearerAuth: []  # Apply Bearer Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid input
 */
router.put("/:id", protect, contactValidationRules(), validate, updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Partially update a contact by ID
 *     description: Update specific fields of a contact without modifying other fields.
 *     security:
 *       - oAuthSample:  # Apply OAuth 2.0 security
 *         - write_contacts  # Required scope
 *       - bearerAuth: []  # Apply Bearer Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteColor:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Invalid input
 */
router.patch('/:id', protect, patchContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     security:
 *       - oAuthSample:  # Apply OAuth 2.0 security
 *         - write_contacts  # Required scope
 *       - bearerAuth: []  # Apply Bearer Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete("/:id", protect, deleteContact);

module.exports = router;






// ======================================================================================================

// Example of File Upload Endpoint in Swagger
// If you have an endpoint for uploading files, you can document it like this:


// /**
//  * @swagger
//  * /contacts/upload:
//  *   post:
//  *     summary: Upload a file for a contact
//  *     security:
//  *       - oAuthSample:  # Apply OAuth 2.0 security
//  *         - write_contacts  # Required scope
//  *       - bearerAuth: []  # Apply Bearer Authentication
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               contactId:
//  *                 type: string
//  *               file:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       200:
//  *         description: File uploaded successfully
//  *       400:
//  *         description: Invalid file or missing fields
//  */
// router.post('/upload', protect, uploadFile);