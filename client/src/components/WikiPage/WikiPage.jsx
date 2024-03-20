import React, { useState, useEffect } from 'react';
import Equipage from '../Wiki/Equipage';
import data from './Wiki.json';
import './WikiPage.css';

const WikiPage = () => {
    const [equipages, setEquipages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
      setEquipages(data.equipages);
    }, []);
    const handleSearchClick = (e) => {
      e.stopPropagation();
    };
    const filteredEquipages = equipages.filter(equipage =>
      equipage.membres.some(membre =>
        membre.nom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    return (
      <div className="equipages-container" class="equipages-container">
        <h1 className="page-title">Wiki One Piece</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un Equipage..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleSearchClick}
        />
        {filteredEquipages.map((equipage, index) => (
          <Equipage key={index} equipage={equipage} />
        ))}
      </div>
    );
  };
  export default WikiPage;
