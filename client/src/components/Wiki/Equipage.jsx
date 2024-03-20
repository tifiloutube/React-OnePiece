import React, { useState } from 'react';
import './Equipage.css';

const Equipage = ({ equipage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEquipageClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="equipage-container" onClick={handleEquipageClick}>
      <div className="equipage-block">
        <h3 className="equipage-name">{equipage.nomEquipage}</h3>
        <img className="equipage-flag" src={equipage.jollyRoger} alt="Drapeau" />
        {isOpen && (
          <div className="equipage-details">
            <p><strong>Bateau:</strong> {equipage.nomBateau}</p>
            <img src={equipage.imageBateau} alt="Bateau" />
            <p><strong>Jolly Roger:</strong> <img src={equipage.jollyRoger} alt="Jolly Roger" /></p>
            <h4>Membres de l'équipage:</h4>
            <ul className="member-list">
              {equipage.membres.map((membre, index) => (
                <li key={index} className="member-item">
                  <h5 className="member-name">{membre.nom}</h5>
                  <div className="member-details">
                    <p><strong>Poste:</strong> {membre.poste}</p>
                    <p><strong>Fruit du Démon:</strong> {membre.fruitDuDemon}</p>
                    <p><strong>Prime:</strong> {membre.prime}</p>
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
