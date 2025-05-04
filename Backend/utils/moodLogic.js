
const calculateMood = (createdAt) => {
  const now = new Date();                         // Current date
  const diffInMs = now - new Date(createdAt);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 1) return 'Happy';
  if (diffInDays <= 3) return 'Excited';
  return 'Sad';
};

module.exports = { calculateMood }; 
