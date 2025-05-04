// --- START OF FILE src/components/EditPetForm.js ---
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/global.css';

// Removed status
const EditPetForm = ({ pet, onClose, onUpdatePet }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
    personality: '',

  });
  const [errors, setErrors] = useState({});                              //  validation state

  // pet props
  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || '',
        species: pet.species || '',
        age: pet.age?.toString() || '',
        personality: pet.personality || '',
      });
    }
  }, [pet]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.species.trim()) newErrors.species = 'Species is required';
    if (!formData.age || parseInt(formData.age, 10) < 0) newErrors.age = 'Valid age is required (0 or more)';
    if (!formData.personality.trim()) newErrors.personality = 'Personality is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop submission if validation fails


    onUpdatePet(formData);

  };


  if (!pet) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Edit Pet: {pet.name}</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-name">Name</label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleChange}

                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="edit-species">Species</label>
              <input
                type="text"
                id="edit-species"
                name="species"
                value={formData.species}
                onChange={handleChange}

                className={`form-control ${errors.species ? 'is-invalid' : ''}`}
              />
              {errors.species && <div className="invalid-feedback">{errors.species}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-age">Age (Years)</label>
              <input
                type="number"
                id="edit-age"
                name="age"
                min="0"
                value={formData.age}
                onChange={handleChange}

                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                placeholder="Enter age in years"
              />
              {errors.age && <div className="invalid-feedback">{errors.age}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="edit-personality">Personality</label>
              <input
                type="text"
                id="edit-personality"
                name="personality"
                value={formData.personality}
                onChange={handleChange}

                className={`form-control ${errors.personality ? 'is-invalid' : ''}`}
              />
              {errors.personality && <div className="invalid-feedback">{errors.personality}</div>}
            </div>
          </div>

          <button type="submit" className="submit-button">Update Pet</button>   {/* Removed Mood and Status fields */}
        </form>
      </div>
    </div>
  );
};

export default EditPetForm;
