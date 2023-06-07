const express = require('express');
const router = express.Router();
// checkAuthorization(['etudiant'])
const reclamationController = require('../controllers/reclamationController.js');
const checkAuthorization = require('../middleware/checkAuthorization.js');
// Créer un nouvel reclamation
router.post('/create',reclamationController.createReclamation );

// Obtenir les reclamation n'on pas encore traiter
router.get('/',reclamationController.getAllReclamations);

router.put('/traited/:id', reclamationController.traiterReclamation);

router.get('/AllTraited', reclamationController.getReclamationsTraited);

module.exports = router;
