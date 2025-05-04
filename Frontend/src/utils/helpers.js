// adoption status
export const getDisplayStatus = (adopted) => {
  return adopted ? 'Adopted' : 'Available';
};

export const getStatusClass = (adopted) => {
  return adopted ? 'adopted' : 'available';
};

export const formatAdoptionDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return 'Invalid Date';
  }
};


//  mood function
export const getMoodClass = (mood) => {
  return mood?.toLowerCase() || 'unknown';
};

export const getMoodEmoji = (mood) => {
  switch (mood?.toLowerCase() ?? '') {
    case 'happy':
      return '😊';
    case 'excited':
      return '🤩';
    case 'sad':
      return '😢';
    default:
      return '';
  }
};
