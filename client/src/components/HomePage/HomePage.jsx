import React from 'react';
import PlayerForm from '../PlayerForm/PlayerForm';
import Scoreboard from '../Scoreboard/Scoreboard';
import './HomePage.css';

function HomePage({ players, onPlayersSet }) {
    return (
        <div className="homePage">
            <h1 className="homePage__title">Bienvenue sur OnePiece-MiniGame</h1>
            <PlayerForm onPlayersSet={onPlayersSet} />
            <Scoreboard players={players} />
        </div>
    );
}

export default HomePage;