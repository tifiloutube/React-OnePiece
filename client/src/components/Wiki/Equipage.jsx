import React, { useState } from 'react';
import './Equipage.css';

const Equipage = ({ equipage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEquipageClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
  };

  const filteredMembres = equipage.membres.filter(membre =>
    membre.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="equipage-container">
      <div className="equipage-block">
        <h3 className="equipage-name">{equipage.nomEquipage}</h3>
        <img className="imgDrapeau" src={equipage.jollyRoger} alt="Drapeau" />
        <tr></tr>
        <button onClick={handleEquipageClick}>Learn more</button>
        {isOpen && (
          <div className="equipage-details">
            <p><strong>Bateau:</strong> {equipage.nomBateau}</p>
            <img className='nameboat' src={equipage.imageBateau} alt="Bateau" />
            <p><strong>Jolly Roger:</strong> <img className="imgDrapeau" src={equipage.jollyRoger} alt="Jolly Roger" /></p>
            <h4>Membres de l'équipage:</h4>
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={handleSearchClick}
            />
            <ul className="member-list">
              {filteredMembres.map((membre, index) => (
                  <li key={index} className="member-item" style={{'--background-image': `url(${membre.img})`}}>
                    <h5 className="member-name">{membre.nom}</h5>
                    <div className="member-details">
                      <p><strong>Poste:</strong> {membre.poste}</p>
                      <p><strong>Arme:</strong> {membre.arme}</p>
                      <p><strong>Fruit du Démon:</strong> {membre.fruitDuDemon}</p>
                      <p><strong>Haki:</strong> {membre.haki}</p>
                      <p><strong>Prime:</strong> {membre.prime}</p>
                      <p><strong>Commentaire:</strong> {membre.commentaire}</p>
                    </div>
                  </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Equipage;
