import React, { useState, useEffect } from 'react';
import WordDisplay from './WordDisplay';
import './Hangman.css';

const Hangman = ({ players, onWin }) => {
    const [word, setWord] = useState("onepiece");
    const [guesses, setGuesses] = useState([]);
    const maxTries = 6;
    const wrongGuesses = guesses.filter(letter => !word.includes(letter));
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const isGameOver = wrongGuesses.length >= maxTries;
    const isGameWon = word.split('').every(letter => guesses.includes(letter));
    const [winAnnounced, setWinAnnounced] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isGameOver && !isGameWon) {
                const { key, keyCode } = event;
                if (keyCode >= 65 && keyCode <= 90) {
                    handleGuess(key.toLowerCase());
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [guesses, isGameOver, isGameWon]);

    useEffect(() => {
        if (isGameWon && !winAnnounced) {
            onWin(players[currentPlayerIndex].name);
            setWinAnnounced(true);
        }
    }, [isGameWon, winAnnounced, players, currentPlayerIndex, onWin]);

    const handleGuess = (letter) => {
        if (!guesses.includes(letter)) {
            setGuesses([...guesses, letter]);
        }
    };

    const resetGame = () => {
        setGuesses([]);
        setWord("onepiece");
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        setWinAnnounced(false);
    };

    return (
        <div className="hangman">
            <h2>Tour de {players[currentPlayerIndex].name}</h2>
            <WordDisplay word={word} guesses={guesses} />
            {isGameOver && <p className="hangman__gameOver">Perdu ! Le mot était : {word}</p>}
            {isGameWon && <p className="hangman__congratulations">Félicitation vous avez trouvé le mot !</p>}
            <div className="hangman__wrongGuesses">Tentative : {wrongGuesses.length}/{maxTries}</div>
            <div className="hangman__guesses">
                <p>Lettres déjà utilisé :</p>
                <ul className="hangman__guessList">
                    {wrongGuesses.map((letter, index) => (
                        <li key={index} className="hangman__guess">{letter}</li>
                    ))}
                </ul>
            </div>
            {(isGameOver || isGameWon) && <button className="hangman__resetButton" onClick={resetGame}>Rejouer</button>}
        </div>
    );
};

export default Hangman;