import React from 'react';
import { X } from 'lucide-react';
import { getDisplayStatus, getStatusClass, formatAdoptionDate, getMoodClass } from '../utils/helpers';    //import helper file
import '../styles/global.css';

const PetCard = ({ pet, onClose }) => {
  if (!pet) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container pet-card-container">
        <div className="modal-header">
          <h3 className="modal-title">Pet Details: {pet.name}</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} color="#6c757d" />
          </button>
        </div>

        <div className="card-body pet-card-content">
          {/* Name */}
          <div className="pet-info-row">
            <span className="pet-info-label">Name:</span>
            <span className="pet-info-value">{pet.name}</span>
          </div>

          {/* Species */}
          <div className="pet-info-row">
            <span className="pet-info-label">Species:</span>
            <span className="pet-info-value">{pet.species}</span>
          </div>


          {/* Age */}
          <div className="pet-info-row">
            <span className="pet-info-label">Age:</span>
            <span className="pet-info-value">{pet.age ?? 'N/A'} years</span>
          </div>


          {/* Mood */}
          <div className="pet-info-row">
            <span className="pet-info-label">Mood:</span>
            <span className="pet-info-value">



              <span className={`mood-tag ${getMoodClass(pet.mood)}`}>     
                {pet.mood || 'N/A'}
              </span>
            </span>
          </div>

          {/* Personality */}
          <div className="pet-info-row">
            <span className="pet-info-label">Personality:</span>
            <span className="pet-info-value">{pet.personality || 'N/A'}</span>
          </div>


          {/* Status */}
          <div className="pet-info-row">
            <span className="pet-info-label">Status:</span>
            <span className="pet-info-value">


              <span className={`status-tag ${getStatusClass(pet.adopted)}`}>
                {getDisplayStatus(pet.adopted)}
              </span>
            </span>
          </div>


          {/* Adoption Date*/}
          {pet.adopted && (
            <div className="pet-info-row">
              <span className="pet-info-label">Adopted On:</span>
              <span className="pet-info-value">

                {formatAdoptionDate(pet.adoption_date)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
