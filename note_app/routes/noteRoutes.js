const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');

// Afficher tous les notes
router.get('/', noteController.getNotes);

// Rechercher un note by id
router.get('/:id', noteController.getNoteById);

// Ajouter un note
router.post('/', noteController.addNote);

// Mettre à jour un note
router.put('/:id', noteController.updateNote);

// Supprimer un note
router.delete('/:id', noteController.deleteNote);

module.exports = router