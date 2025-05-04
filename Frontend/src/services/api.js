import axios from 'axios'; 

// Base URL 
const API_BASE_URL = 'http://localhost:5000/pets';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// handle errors 
const handleRequest = async (request) => {
  try {
    const response = await request(); 
    return response.data; 
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.error || 'An API error occurred');
  }
};


// Get all pets
export const getAllPets = () => {
  return handleRequest(() => apiClient.get('/'));
};

// Get a pet by ID
export const getPetById = (id) => {
  return handleRequest(() => apiClient.get(`/${id}`));
};

// Create a new pet
export const createPet = (petData) => {
  const dataToSend = {
    name: petData.name,
    species: petData.species,
    age: parseInt(petData.age, 10) || 0,
    personality: petData.personality,
  };
  return handleRequest(() => apiClient.post('/', dataToSend));
};

// Update an existing pet
export const updatePet = (id, petData) => {
  const dataToSend = {
    name: petData.name,
    species: petData.species,
    age: parseInt(petData.age, 10) || 0,
    personality: petData.personality,
  };
  return handleRequest(() => apiClient.put(`/${id}`, dataToSend));
};

// Mark a pet as adopted
export const adoptPet = (id) => {
  return handleRequest(() => apiClient.patch(`/${id}/adopt`));
};

// Delete a pet
export const deletePet = (id) => {
  return handleRequest(() => apiClient.delete(`/${id}`));
};

// Filter pets by mood 
export const filterPetsByMood = (mood) => {
  if (!mood) {
    return getAllPets();
  }
  return handleRequest(() => apiClient.get(`/filter?mood=${encodeURIComponent(mood)}`));
};
