const express = require('express');
const PetController = require('../controllers/petController'); // import Controller

const router = express.Router();                             // Router setup

router.post('/', PetController.createPet);                   // Create pet
router.get('/', PetController.getAllPets);                   // Get all
router.get('/filter', PetController.filterPetsByMood);       // Filter pets
router.get('/:id', PetController.getPetById);                // Get byId
router.put('/:id', PetController.updatePet);                 // Update pet
router.patch('/:id/adopt', PetController.adoptPet);          // Adopt pet
router.delete('/:id', PetController.deletePet);              // Delete pet

module.exports = router;                                     // Export router
