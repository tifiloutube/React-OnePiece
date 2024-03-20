import React, { useState } from 'react';
import './PlayerForm.css';

function PlayerForm({ onPlayersSet }) {
    const [playerNames, setPlayerNames] = useState(['']);

    const handleNameChange = (index, event) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
    };

    const handleAddPlayer = () => {
        setPlayerNames([...playerNames, '']);
    };

    const handleRemovePlayer = (indexToRemove) => {
        setPlayerNames(playerNames.filter((_, index) => index !== indexToRemove));
    };

    const handleRemoveAllPlayers = () => {
        setPlayerNames(['']);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onPlayersSet(playerNames.filter(name => name.trim() !== ''));
    };

    return (
        <form onSubmit={handleSubmit} className="playerForm">
            {playerNames.map((name, index) => (
                <div key={index} className="playerForm__inputGroup">
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => handleNameChange(index, event)}
                        placeholder="Pseudo du joueur"
                        className="playerForm__input"
                    />
                    <button type="button" onClick={() => handleRemovePlayer(index)} className="playerForm__removeButton">Supprimer</button>
                </div>
            ))}
            <div className="playerForm__buttons">
                <button type="button" onClick={handleAddPlayer} className="playerForm__addButton">Ajouter un joueur</button>
                <button type="button" onClick={handleRemoveAllPlayers} className="playerForm__removeAllButton">Supprimer tous les joueurs</button>
                <button type="submit" className="playerForm__submitButton">Commencer</button>
            </div>
        </form>
    );
}

export default PlayerForm;