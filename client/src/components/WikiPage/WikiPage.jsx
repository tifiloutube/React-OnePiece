import React, { useState, useEffect } from 'react';
import Equipage from '../Wiki/Equipage';
import data from './Wiki.json';
import './WikiPage.css';

const WikiPage = () => {
  const [equipages, setEquipages] = useState([]);

  useEffect(() => {
    setEquipages(data.equipages);
  }, []);

  return (
    <div>
      <h1 className="page-title">Wiki One Piece</h1>
      <section className="wrapper">
        {equipages.map((equipage, index) => (
            <Equipage key={index} equipage={equipage} />
        ))}
      </section>
    </div>
  );
};

export default WikiPage;
