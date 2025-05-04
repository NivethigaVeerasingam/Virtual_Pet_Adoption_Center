const mongoose = require('mongoose');                    // Mongoose import

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,                                      // Name 
  },
  species: {
    type: String,
    required: true,                                      // Species 
  },
  age: {
    type: Number,
    required: true,                                      // Age 
  },
  personality: {
    type: String,
    required: true,                                      // Personality 
  },
  mood: {
    type: String,
    default: 'Happy'                                     // mood
  },

  adopted: {
    type: Boolean,
    default: false,                                      // adopted
  },
  adoption_date: {
    type: Date,
    default: null,                                       // date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Pet = mongoose.model('Pet', petSchema);            // create model 

module.exports = Pet;                                    // export model
