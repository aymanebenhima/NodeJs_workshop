const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

// Afficher tous les contacts
router.get('/', contactController.getContacts);

// Rechercher un contact by id
router.get('/:id', contactController.getContactById);

// Ajouter un contact
router.post('/', contactController.addContact);

// Mettre à jour un contact
router.put('/:id', contactController.updateContact);

// Supprimer un contact
router.delete('/:id', contactController.deleteContact);

module.exports = router