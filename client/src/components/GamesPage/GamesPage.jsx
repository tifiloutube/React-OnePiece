import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Scoreboard from '../Scoreboard/Scoreboard';
import './GamesPage.css';
import Hangman from "../MiniGames/Hangman/Hangman";
import Qcm from "../MiniGames/QCM/Qcm";
import DevineLePersonnage from "../MiniGames/DevineLePersonnage/DevineLePersonnage";

function GamesPage({ players, setPlayers }) {
    const [selectedGame, setSelectedGame] = useState(null);

    const handleWin = (playerName) => {
        const updatedPlayers = players.map(player => {
            if (player.name === playerName) {
                return { ...player, score: player.score + 1 };
            }
            return player;
        });
        setPlayers(updatedPlayers);
    };

    const renderGameComponent = () => {
        if (!players.length) {
            return (
                <div className="gamesPage__noPlayers">
                    Veuillez ajouter un personnage.
                    <br />
                    <Link to="/" className="gamesPage__link">Retourner à la HomePage pour ajouter un personnage</Link>
                </div>
            );
        }

        switch (selectedGame) {
            case 'Pendu':
                return <Hangman players={players} onWin={handleWin} />;
            case 'Qcm':
                return <Qcm />;
            case 'DevineLePersonnage':
                return <DevineLePersonnage />;
            default:
                return <div className="gamesPage__selectGame">Sélectionnez un jeu pour commencer</div>;
        }
    };

    return (
        <div className="gamesPage">
            <h1 className="gamesPage__title">Mini-Jeux Disponibles</h1>
            <ul className="gamesPage__list">
                <li className="gamesPage__listItem" onClick={() => setSelectedGame('Pendu')}>Pendu</li>
                <li className="gamesPage__listItem" onClick={() => setSelectedGame('Qcm')}>Qcm</li>
                <li className="gamesPage__listItem" onClick={() => setSelectedGame('DevineLePersonnage')}>Devine le Personnage</li>
            </ul>
            <Scoreboard players={players}/>
            <div className="gamesPage__gameComponent">
                {renderGameComponent()}
            </div>
        </div>
    );
}

export default GamesPage;