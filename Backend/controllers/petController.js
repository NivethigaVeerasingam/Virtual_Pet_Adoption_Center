const PetService = require('../services/petService');  //import service file

//crete Controller 
class PetController {
  static async createPet(req, res) {
    try {
      const pet = await PetService.createPet(req.body);
      res.status(201).json(pet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //getall Controller 
  static async getAllPets(req, res) {
    try {
      const pets = await PetService.getAllPets();
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //get Controller 
  static async getPetById(req, res) {
    try {
      const pet = await PetService.getPetById(req.params.id);
      res.json(pet);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  //update Controller 
  static async updatePet(req, res) {
    try {
      const pet = await PetService.updatePet(req.params.id, req.body);
      res.json(pet);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  //update adopt status Controller 
  static async adoptPet(req, res) {
    try {
      const pet = await PetService.adoptPet(req.params.id);
      res.json(pet);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  //delete Controller 
  static async deletePet(req, res) {
    try {
      const result = await PetService.deletePet(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  //get mood 
  static async filterPetsByMood(req, res) {
    try {
      const pets = await PetService.filterPetsByMood(req.query.mood);
      res.json(pets);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PetController;        //export controller