const express = require('express');
const router = express.Router();

const reclamationController = require('../controllers/reclamationController.js');
const checkAuthorization = require('../middleware/checkAuthorization.js');
// Créer un nouvel reclamation
router.post('/create',checkAuthorization(['etudiant']),reclamationController.createReclamation );

// Obtenir les reclamation n'on pas encore traiter
router.get('/',checkAuthorization(['etudiant']),reclamationController.getAllReclamations);

router.put('/traited/:id', reclamationController.traiterReclamation);

router.get('/AllTraited', reclamationController.getReclamationsTraited);

module.exports = router;
