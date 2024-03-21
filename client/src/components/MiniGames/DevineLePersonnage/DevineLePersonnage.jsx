import React, { useState, useEffect } from 'react';
import './DevineLePersonnage.css';
import charactersData from './DevineLePersonnage.json';

const DevineLePersonnage = ({ players, onWin }) => {
    const [character, setCharacter] = useState({});
    const [guesses, setGuesses] = useState([]);
    const maxTries = 6;
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [winAnnounced, setWinAnnounced] = useState(false);

    useEffect(() => {
        if (charactersData.length > 0) {
            const randomCharacter = charactersData[Math.floor(Math.random() * charactersData.length)];
            setCharacter(randomCharacter);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key, keyCode } = event;
            const letter = key.toLowerCase();
            if (!guesses.includes(letter) && keyCode >= 65 && keyCode <= 90) {
                setGuesses([...guesses, letter]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [guesses]);

    useEffect(() => {
        const currentPlayer = players[currentPlayerIndex];
        if (character.nom_du_personnage && currentPlayer && onWin) {
            const isGameWon = character.nom_du_personnage.split('').every(letter => guesses.includes(letter));

            if (isGameWon && !winAnnounced) {
                alert('Félicitations ! Vous avez deviné le personnage : ' + character.nom_du_personnage);
                setWinAnnounced(true);
                onWin(currentPlayer); // Mettre à jour les scores ici
            }
        }

    }, [guesses, winAnnounced, character, onWin, players, currentPlayerIndex]);

    const resetGame = () => {
        setGuesses([]);
        setWinAnnounced(false);
        if (charactersData.length > 0) {
            const randomCharacter = charactersData[Math.floor(Math.random() * charactersData.length)];
            setCharacter(randomCharacter);
        }
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    };

    const wrongGuesses = guesses.filter(letter => !character.nom_du_personnage || !character.nom_du_personnage.includes(letter));

    return (
        <div className="guess-character">
            <h2>Tour de {players[currentPlayerIndex].name}</h2>
            {character.image && <img src={character.image} alt={character.nom_du_personnage} className="character-image" />}
            <div className="word-to-guess">
                {character.nom_du_personnage && character.nom_du_personnage.split('').map((letter, index) => (
                    <div key={index} className="character-letter">
                        {guesses.includes(letter) ? letter : '_'}
                    </div>
                ))}
            </div>
            <div className="wrong-guesses">Tentatives restantes : {maxTries - wrongGuesses.length}/{maxTries}</div>
            <div className="guesses">
                <p>Lettres déjà utilisées :</p>
                <ul className="guess-list">
                    {wrongGuesses.map((letter, index) => (
                        <li key={index} className="guess">{letter}</li>
                    ))}
                </ul>
            </div>
            {(wrongGuesses.length >= maxTries || (character.nom_du_personnage && character.nom_du_personnage.split('').every(letter => guesses.includes(letter)))) &&
            <button className="reset-button" onClick={resetGame}>Rejouer</button>}
        </div>
    );
};

export default DevineLePersonnage;