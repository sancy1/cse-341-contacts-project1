const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  patchContact,
} = require("../controllers/contactsController");

/** --------------------------------------------------------------------- 
 * @swagger
 * /contacts: 
 * get:
 * summary: Get all contacts
 * responses:
 * 200:
 * description: List of all contacts
 */
router.get("/", getAllContacts);

/** ---------------------------------------------------------------------
 * @swagger
 * /contacts/{id}:
 * get:
 * summary: Get a single contact by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID of the contact to retrieve
 * responses:
 * 200:
 * description: Contact details
 * 404:
 * description: Contact not found
 */
router.get("/:id", getContactById);

/** ---------------------------------------------------------------------
 * @swagger
 * /contacts:
 * post:
 * summary: Create a new contact
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * firstName:
 * type: string
 * lastName:
 * type: string
 * email:
 * type: string
 * favoriteColor:
 * type: string
 * birthday:
 * type: string
 * format: date
 * responses:
 * 201:
 * description: Contact created successfully
 * 400:
 * description: Invalid input
 */
router.post("/", createContact);

/** ---------------------------------------------------------------------
 * @swagger
 * /contacts/{id}:
 * put:
 * summary: Update a contact by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID of the contact to update
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * firstName:
 * type: string
 * lastName:
 * type: string
 * email:
 * type: string
 * favoriteColor:
 * type: string
 * birthday:
 * type: string
 * format: date
 * responses:
 * 200:
 * description: Contact updated successfully
 * 404:
 * description: Contact not found
 * 400:
 * description: Invalid input
 */
router.put("/:id", updateContact);

/** ---------------------------------------------------------------------
 * @swagger
 * /contacts/{id}:
 * patch:
 * summary: Partially update a contact by ID
 * description: Update specific fields of a contact without modifying other fields.
 * parameters:
 *  - in: path
 * name: id
 * required: true
 * description: ID of the contact to update
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * firstName:
 * type: string
 * lastName:
 * type: string
 * email:
 * type: string
 * favoriteColor:
 * type: string
 * birthday:
 * type: string
 * format: date
 * responses:
 * 200:
 * description: Contact updated successfully
 * 404:
 * description: Contact not found
 * 400:
 * description: Invalid input
 */
router.patch('/:id', patchContact);

/** ---------------------------------------------------------------------
 * @swagger
 * /contacts/{id}:
 * delete:
 * summary: Delete a contact by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID of the contact to delete
 * responses:
 * 200:
 * description: Contact deleted successfully
 * 404:
 * description: Contact not found
 */
router.delete("/:id", deleteContact);

module.exports = router;