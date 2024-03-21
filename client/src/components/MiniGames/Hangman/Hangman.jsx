import React, { useState, useEffect, useCallback } from 'react';
import WordDisplay from './WordDisplay';
import './Hangman.css';

const Hangman = ({ players, onWin }) => {
    const [word, setWord] = useState("onepiece");
    const [guesses, setGuesses] = useState([]);
    const maxTries = 6;
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [winAnnounced, setWinAnnounced] = useState(false);


    const handleGuess = useCallback((letter) => {
        if (!guesses.includes(letter)) {
            setGuesses([...guesses, letter]);
        }
    }, [guesses]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key, keyCode } = event;
            if (!guesses.includes(key.toLowerCase()) && keyCode >= 65 && keyCode <= 90) {
                handleGuess(key.toLowerCase());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [guesses, handleGuess]);

    useEffect(() => {
        const isGameWon = word.split('').every(letter => guesses.includes(letter));

        if (isGameWon && !winAnnounced) {
            onWin(players[currentPlayerIndex]);
            setWinAnnounced(true);
        }
    }, [guesses, winAnnounced, players, currentPlayerIndex, word, onWin]);

    const resetGame = () => {
        setGuesses([]);
        setWord("onepiece");
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        setWinAnnounced(false);
    };

    const wrongGuesses = guesses.filter(letter => !word.includes(letter));

    return (
        <div className="hangman">
            <h2>Tour de {players[currentPlayerIndex].name}</h2>
            <WordDisplay word={word} guesses={guesses} />
            {wrongGuesses.length >= maxTries && <p className="hangman__gameOver">Perdu ! Le mot était : {word}</p>}
            {word.split('').every(letter => guesses.includes(letter)) && <p className="hangman__congratulations">Félicitation vous avez trouvé le mot !</p>}
            <div className="hangman__wrongGuesses">Tentative : {wrongGuesses.length}/{maxTries}</div>
            <div className="hangman__guesses">
                <p>Lettres déjà utilisé :</p>
                <ul className="hangman__guessList">
                    {wrongGuesses.map((letter, index) => (
                        <li key={index} className="hangman__guess">{letter}</li>
                    ))}
                </ul>
            </div>
            {(wrongGuesses.length >= maxTries || word.split('').every(letter => guesses.includes(letter))) && <button className="hangman__resetButton" onClick={resetGame}>Rejouer</button>}
        </div>
    );
};

export default Hangman;