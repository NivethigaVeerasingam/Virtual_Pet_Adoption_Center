import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/global.css'; // Import styles

const AddPetForm = ({ onClose, onAddPet }) => {

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    age: '',
    personality: ''
  });

  //errors validation 
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.species.trim()) newErrors.species = 'Species is required';
    if (!formData.age || parseInt(formData.age, 10) < 0) newErrors.age = 'Valid age is required (0 or more)';
    if (!formData.personality.trim()) newErrors.personality = 'Personality is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update data 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear the error 
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handles  submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;


    onAddPet(formData);

  };

  // Render the modal form
  return (

    <div className="modal-backdrop">

      <div className="modal-container">

        <div className="modal-header">
          <h3 className="modal-title">Add New Pet</h3>
          <button className="close-button" onClick={onClose} aria-label="Close form">
            <X size={20} />
          </button>
        </div>


        {/* Row for Name and Species inputs */}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />

              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="species">Species</label>
              <input
                type="text"
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                className={`form-control ${errors.species ? 'is-invalid' : ''}`}
                placeholder="e.g., Dog, Cat"
              />
              {errors.species && <div className="invalid-feedback">{errors.species}</div>}
            </div>
          </div>


          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age (Years)</label>
              <input
                type="number"
                id="age"
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
              <label htmlFor="personality">Personality</label>
              <input
                type="text"
                id="personality"
                name="personality"
                value={formData.personality}
                onChange={handleChange}
                className={`form-control ${errors.personality ? 'is-invalid' : ''}`}

              />
              {errors.personality && <div className="invalid-feedback">{errors.personality}</div>}
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" className="submit-button">Add Pet</button>
        </form>
      </div>
    </div>
  );
};

export default AddPetForm;
