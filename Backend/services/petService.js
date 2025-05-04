const Pet = require('../models/petModel');
const { calculateMood } = require('../utils/moodLogic');

class PetService {
  // Create pet
  static async createPet(data) {
    const pet = new Pet(data);
    await pet.save();
    return pet;
  }

  // Get all
  static async getAllPets() {
    const pets = await Pet.find();
    return pets.map(pet => ({
      ...pet.toObject(),
      mood: calculateMood(pet.created_at)
    }));
  }

  // Get byId
  static async getPetById(id) {
    const pet = await Pet.findById(id);
    if (!pet) throw new Error('Pet not found');
    return {
      ...pet.toObject(),
      mood: calculateMood(pet.created_at)
    };
  }

  // Update pet
  static async updatePet(id, data) {
    const pet = await Pet.findByIdAndUpdate(id, data, { new: true });
    if (!pet) throw new Error('Pet not found');
    return {
      ...pet.toObject(),
      mood: calculateMood(pet.created_at)
    };
  }

  // Adopt pet
  static async adoptPet(id) {
    const pet = await Pet.findByIdAndUpdate(
      id,
      { adopted: true, adoption_date: new Date() },
      { new: true }
    );
    if (!pet) throw new Error('Pet not found');
    return {
      ...pet.toObject(),
      mood: calculateMood(pet.created_at)
    };
  }

  // Delete pet
  static async deletePet(id) {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) throw new Error('Pet not found');
    return { message: 'Pet deleted successfully' };
  }

  // Filter mood
  static async filterPetsByMood(mood) {
    const pets = await Pet.find();
    return pets
      .filter(pet => calculateMood(pet.created_at) === mood)
      .map(pet => ({
        ...pet.toObject(),
        mood: calculateMood(pet.created_at)
      }));
  }
}

module.exports = PetService;
