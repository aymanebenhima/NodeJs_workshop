const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes pour la connexion
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;