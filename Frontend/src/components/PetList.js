import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Eye, Edit, Trash, Filter, Plus, Home, Loader } from 'lucide-react';
import FilterBar from './FilterBar';
import AddPetForm from './AddPetForm';
import PetCard from './PetCard';
import EditPetForm from './EditPetForm';
import DeletePet from './DeletePet';
import * as api from '../services/api';

// Import helpers, getMoodEmoji
import { getDisplayStatus, getStatusClass, getMoodClass, getMoodEmoji } from '../utils/helpers';
import '../styles/global.css';

//  animation
const FADE_OUT_DURATION = 300; // ms

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMoodFilters, setActiveMoodFilters] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showPetCard, setShowPetCard] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [fadingOutPetIds, setFadingOutPetIds] = useState([]);
  const [recentlyAdoptedPetId, setRecentlyAdoptedPetId] = useState(null);
  const ADOPT_PULSE_DURATION = 600;

  // Fetch pets function
  const fetchPets = useCallback(async () => {
    setError(null);
    try {
      const data = await api.getAllPets();
      setPets(data.map(pet => ({ ...pet, id: pet._id })));
    } catch (err) {
      setError(err.message || 'Failed to fetch pets.');
      setPets([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPets().finally(() => setLoading(false));
  }, [fetchPets]);

  const applyFilters = (moods) => { setActiveMoodFilters(moods); setShowFilterBar(false); };

  const filteredPetsToDisplay = useMemo(() => {
    if (activeMoodFilters.length === 0) return pets;
    return pets.filter(pet => activeMoodFilters.includes(pet.mood));
  }, [pets, activeMoodFilters]);

  const openAddForm = () => setShowAddForm(true);
  const closeAddForm = () => setShowAddForm(false);
  const closeEditForm = () => { setShowEditForm(false); setSelectedPet(null); };
  const closePetCard = () => { setShowPetCard(false); setSelectedPet(null); };
  const closeDeleteModal = () => { setShowDeleteModal(false); setPetToDelete(null); };
  const toggleFilterBar = () => setShowFilterBar(!showFilterBar);

  const handleAddPet = async (newPetData) => { setLoading(true); try { await api.createPet(newPetData); closeAddForm(); await fetchPets(); } catch (err) { setError(err.message || 'Failed to add pet.'); } finally { setLoading(false); } };
  const handleViewPet = (pet) => { setSelectedPet(pet); setShowPetCard(true); };
  const handleEditPet = (pet) => { setSelectedPet(pet); setShowEditForm(true); };
  const handleUpdatePet = async (updatedPetData) => { if (!selectedPet || !selectedPet._id) { setError("Cannot update pet: ID missing."); return; } setLoading(true); try { await api.updatePet(selectedPet._id, updatedPetData); closeEditForm(); await fetchPets(); } catch (err) { setError(err.message || 'Failed to update pet.'); } finally { setLoading(false); } };
  const handleDeletePet = (id) => { if (!fadingOutPetIds.includes(id)) { setPetToDelete(id); setShowDeleteModal(true); } };
  const confirmDeletePet = async () => { if (!petToDelete || fadingOutPetIds.includes(petToDelete)) return; const idToDelete = petToDelete; closeDeleteModal(); try { setFadingOutPetIds(prev => [...prev, idToDelete]); await api.deletePet(idToDelete); setTimeout(() => { setPets(prevPets => prevPets.filter(p => p._id !== idToDelete)); setFadingOutPetIds(prev => prev.filter(id => id !== idToDelete)); }, FADE_OUT_DURATION); } catch (err) { setError(err.message || 'Failed to delete pet.'); setFadingOutPetIds(prev => prev.filter(id => id !== idToDelete)); } };
  const handleAdoptPet = async (id) => { if (!id || recentlyAdoptedPetId === id) return; try { setRecentlyAdoptedPetId(id); await api.adoptPet(id); setTimeout(() => setRecentlyAdoptedPetId(null), ADOPT_PULSE_DURATION); setTimeout(() => fetchPets(), 100); } catch (err) { setError(err.message || 'Failed to adopt pet.'); setRecentlyAdoptedPetId(null); } };


  return (
    <div className="container">
      <div className="pet-container">

        {/* Header Section */}
        <div className="pet-header">
          <h1 className="pet-title">Pet List</h1>
          <div className="header-buttons">
            <button className="btn filter-btn" onClick={toggleFilterBar}>
              <Filter size={18} />
              <span>Filter by Mood</span>
            </button>
            <button className="btn add-pet-btn" onClick={openAddForm}>
              <Plus size={18} />
              <span>Add Pet</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        {showFilterBar && (
          <FilterBar
            activeFilters={activeMoodFilters}
            onApplyFilters={applyFilters}
            onClose={() => setShowFilterBar(false)}
          />
        )}

        {/* Error Display */}
        {error && <div className="error-message">Error: {error}</div>}

        {/* Pet Table */}
        <div className="pet-table">

          {/* Table Head */}
          <div className="table-head">
            <div className="row">
              <div className="col-name">Name</div>
              <div className="col-species">Species</div>
              <div className="col-mood">Mood</div>
              <div className="col-status">Status</div>
              <div className="col-actions">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="table-body">
            {loading && pets.length === 0 ? (
              <div className="loading-indicator"><Loader size={30} className="animate-spin" /> Loading Pets...</div>
            ) : filteredPetsToDisplay.length === 0 && !error ? (
              <div className="no-pets-message">
                {pets.length > 0 && activeMoodFilters.length > 0 ? 'No pets found matching the selected filter(s).' : 'No pets available.'}
              </div>
            ) : (
              filteredPetsToDisplay.map((pet) => {
                const isFadingOut = fadingOutPetIds.includes(pet._id);
                const isRecentlyAdopted = recentlyAdoptedPetId === pet._id;
                const rowClassName = `
                    row
                    ${isFadingOut ? 'pet-row-fading-out' : ''}
                    ${isRecentlyAdopted ? 'pet-row-adopted-recently' : ''}
                  `;

                return (
                  <div key={pet._id} className={rowClassName}>
                    <div className="col-name" data-label="Name:">{pet.name}</div>
                    <div className="col-species" data-label="Species:">{pet.species}</div>

                    {/* --- Mood Column with Emoji --- */}
                    <div className="col-mood" data-label="Mood:">
                      <span className={`mood-tag ${getMoodClass(pet.mood)}`}>


                        {/* Get emoji using the helper */}
                        {getMoodEmoji(pet.mood)} {pet.mood || 'N/A'}
                      </span>
                    </div>



                    <div className="col-status" data-label="Status:">
                      <span className={`status-tag ${getStatusClass(pet.adopted)}`}>
                        {getDisplayStatus(pet.adopted)}
                      </span>
                    </div>
                    <div className="col-actions">
                      <button title="View Details" className="action-btn view-btn" onClick={() => handleViewPet(pet)} disabled={isFadingOut}><Eye size={18} /></button>
                      <button title="Edit Pet" className="action-btn edit-btn" onClick={() => handleEditPet(pet)} disabled={pet.adopted || isFadingOut}><Edit size={18} /></button>
                      {!pet.adopted && (<button title="Adopt Pet" className="action-btn adopt-btn" onClick={() => handleAdoptPet(pet._id)} disabled={isFadingOut || isRecentlyAdopted}><Home size={18} /></button>)}
                      <button title="Delete Pet" className="action-btn delete-btn" onClick={() => handleDeletePet(pet._id)} disabled={isFadingOut}><Trash size={18} /></button>
                    </div>
                  </div>
                );
              }
              )
            )}
          </div>
        </div>
      </div>


      {showAddForm && <AddPetForm onClose={closeAddForm} onAddPet={handleAddPet} />}
      {showEditForm && selectedPet && <EditPetForm pet={selectedPet} onClose={closeEditForm} onUpdatePet={handleUpdatePet} />}
      {showPetCard && selectedPet && <PetCard pet={selectedPet} onClose={closePetCard} />}
      <DeletePet isOpen={showDeleteModal} onClose={closeDeleteModal} onConfirm={confirmDeletePet} />

    </div>
  );
};

export default PetList;
