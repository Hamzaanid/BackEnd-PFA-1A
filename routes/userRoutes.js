const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
// Créer un nouvel utilisateur
router.post('/create', userController.createUser);

// Obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

module.exports = router;
