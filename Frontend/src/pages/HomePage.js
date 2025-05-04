import React from 'react';
import PetList from '../components/PetList';
import { PawPrint } from 'lucide-react'; // Import the icon
import '../styles/global.css'; // style imported

const HomePage = () => {
  return (
    //  main container
    <div className="container">

      {/* Heading Section  */}
      <div className="page-heading">
        <PawPrint className="icon" size={36} strokeWidth={2} />
        <h2>Virtual Pet Adoption Center</h2>
      </div>

      <PetList />

    </div>
  );
};

export default HomePage;
