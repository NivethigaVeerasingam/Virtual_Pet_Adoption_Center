import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/global.css'; // Ensure styles are imported

// Define  moods
const AVAILABLE_MOODS = ['Happy', 'Excited', 'Sad'];

const FilterBar = ({ activeFilters, onApplyFilters, onClose }) => {

  const [selectedMoods, setSelectedMoods] = useState(() => {
    const initialState = {};
    AVAILABLE_MOODS.forEach(mood => {
      initialState[mood] = activeFilters?.includes(mood) || false;
    });
    return initialState;
  });

  //  filters 
  useEffect(() => {
    const newState = {};
    AVAILABLE_MOODS.forEach(mood => {
      newState[mood] = activeFilters?.includes(mood) || false;
    });
    setSelectedMoods(newState);
  }, [activeFilters]);


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedMoods(prevMoods => ({
      ...prevMoods,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const moodsToFilter = Object.entries(selectedMoods)
      .filter(([mood, isSelected]) => isSelected)
      .map(([mood]) => mood);


    onApplyFilters(moodsToFilter);
  };

  const handleReset = () => {

    const resetState = {};
    AVAILABLE_MOODS.forEach(mood => {
      resetState[mood] = false;
    });
    setSelectedMoods(resetState);


    onApplyFilters([]);
  };

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h3>Filter by Mood</h3>
        <button className="close-btn" onClick={onClose} aria-label="Close Filter">
          <X size={18} />
        </button>
      </div>

      {/* onSubmit */}
      <form onSubmit={handleSubmit}>
        <div className="filter-content">
          <div className="filter-group checkbox-group">
            <label>Select Moods:</label>
            <div className="checkbox-options">
              {AVAILABLE_MOODS.map((mood) => (
                <div key={mood} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`mood-${mood}`}
                    name={mood}
                    checked={selectedMoods[mood]}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`mood-${mood}`}>{mood}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <button type="button" className="btn reset-btn" onClick={handleReset}>
            Reset Filters
          </button>

          <button type="submit" className="btn apply-btn">        {/* Submit button  */}
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterBar;
