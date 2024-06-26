import React, { useState, useEffect } from 'react';
import './DevineLePersonnage.css';
import charactersData from './DevineLePersonnage.json';

const DevineLePersonnage = ({ players, onWin }) => {
    const [character, setCharacter] = useState({});
    const [guesses, setGuesses] = useState([]);
    const [maxTries, setMaxTries] = useState(5);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [winAnnounced, setWinAnnounced] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [blurLevel, setBlurLevel] = useState(20);

    useEffect(() => {
        if (charactersData.length > 0) {
            const randomCharacter = charactersData[Math.floor(Math.random() * charactersData.length)];
            setCharacter(randomCharacter);
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!gameOver && !winAnnounced) {
                const { key, keyCode } = event;
                const letter = key.toLowerCase();
                if (!guesses.includes(letter) && keyCode >= 65 && keyCode <= 90) {
                    setGuesses([...guesses, letter]);
                    if (!character.nom_du_personnage.includes(letter)) {
                        setBlurLevel(blurLevel - 5);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [guesses, gameOver, winAnnounced, character, blurLevel]);

    useEffect(() => {
        const currentPlayer = players[currentPlayerIndex];
        if (character.nom_du_personnage && currentPlayer && onWin) {
            const isGameWon = character.nom_du_personnage.split('').every(letter => guesses.includes(letter));

            if (isGameWon && !winAnnounced) {
                setWinAnnounced(true);
                onWin(currentPlayer);
            } else if (guesses.length >= maxTries && !gameOver) {
                setGameOver(true);
            }
        }
    }, [guesses, winAnnounced, character, onWin, players, currentPlayerIndex, maxTries, gameOver]);

    const resetGame = () => {
        setGuesses([]);
        setWinAnnounced(false);
        setGameOver(false);
        setMaxTries(5);
        setBlurLevel(20);
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
            <div className="character-image-container">
                {character.image && <img src={character.image} alt={character.nom_du_personnage} className="character-image" style={{ filter: `blur(${blurLevel}px)` }}/>}
            </div>
            <div className="word-to-guess">
                {character.nom_du_personnage && character.nom_du_personnage.split('').map((letter, index) => (
                    <div key={index} className="character-letter">
                        {guesses.includes(letter) ? letter : '_'}
                    </div>
                ))}
            </div>
            {gameOver && <p className="game-over-message">Désolé, vous avez atteint le nombre maximum de tentatives. Le personnage était : {character.nom_du_personnage}</p>}
            {winAnnounced && <p className="win-message">Félicitations ! Vous avez deviné le personnage : {character.nom_du_personnage}</p>}
            {!gameOver && !winAnnounced && <div className="wrong-guesses">Tentatives restantes : {maxTries - wrongGuesses.length}/{maxTries}</div>}
            <div className="guesses">
                <p>Lettres déjà utilisées :</p>
                <ul className="guess-list">
                    {wrongGuesses.map((letter, index) => (
                        <li key={index} className="guess">{letter}</li>
                    ))}
                </ul>
            </div>
            {(gameOver || winAnnounced) &&
            <button className="reset-button" onClick={resetGame}>Rejouer</button>}
        </div>
    );
};

export default DevineLePersonnage;