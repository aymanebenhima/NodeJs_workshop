const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Routes pour les pages
router.get('/home', pageController.getHome);
router.get('/about', pageController.getAbout);

module.exports = router;