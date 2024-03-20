import React, { useState, useEffect } from 'react';
import Equipage from '../Wiki/Equipage';
import data from './Wiki.json';
import './WikiPage.css';

const WikiPage = () => {
    const [equipages, setEquipages] = useState([]);
    const [searchTermEquipage, setSearchTermEquipage] = useState('');
    const [searchTermMembre] = useState('');

    useEffect(() => {
      setEquipages(data.equipages);
    }, []);

    const handleSearchClick = (e) => {
      e.stopPropagation();
    };

    const filteredEquipages = equipages.filter(equipage =>
      equipage.nomEquipage.toLowerCase().includes(searchTermEquipage.toLowerCase())
    );

    return (
      <div className="equipages-container">
        <h1 className="page-title">Wiki One Piece</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher un Equipage..."
          value={searchTermEquipage}
          onChange={(e) => setSearchTermEquipage(e.target.value)}
          onClick={handleSearchClick}
        />
        {filteredEquipages.map((equipage, index) => (
          <Equipage key={index} equipage={{ ...equipage }} searchTermMembre={searchTermMembre} />
        ))}
      </div>
    );
};

export default WikiPage;
