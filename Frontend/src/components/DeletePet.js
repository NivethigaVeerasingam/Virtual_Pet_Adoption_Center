import React from 'react';
import { Trash2 } from 'lucide-react';
import '../styles/global.css';

const DeletePet = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-pet-overlay">
      <div className="delete-pet-modal">
        <div className="delete-icon-circle">
          <Trash2 size={24} />
        </div>

        <h3 className="delete-pet-title">Delete Pet</h3>
        <p className="delete-pet-message">
          Do you really want to delete this pet's details?
        </p>

        <div className="delete-pet-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePet;