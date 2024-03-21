import React, { useState, useEffect } from 'react';
import questionsData from './Qcm.json';
import './Qcm.css';

const Qcm = ({ players, setPlayers }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [showCorrectMessage, setShowCorrectMessage] = useState(false); // Ajout pour gérer l'affichage du message de bonne réponse
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    useEffect(() => {
        // Réinitialiser l'option sélectionnée, la bonne réponse et le message de bonne réponse à chaque nouvelle question
        setSelectedOption("");
        setCorrectAnswer("");
        setShowCorrectMessage(false); // Réinitialiser pour ne pas afficher le message par défaut
    }, [currentQuestionIndex]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const correctOption = questionsData[currentQuestionIndex].answer;
        if (option === correctOption) {
            // Si la réponse est correcte, appelez handleWin et préparez à afficher le message de bonne réponse
            handleWin(players[currentPlayerIndex]);
            setShowCorrectMessage(true); // Préparer à afficher le message de bonne réponse
            setCorrectAnswer(correctOption); // Stocker la bonne réponse pour l'utiliser dans le message
        } else {
            // Si la réponse est incorrecte, stockez la bonne réponse pour l'afficher
            setCorrectAnswer(correctOption);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Réinitialiser ou afficher un message de fin de quiz
            console.log("Fin du quiz");
            setCurrentQuestionIndex(0);
            setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        }
        setSelectedOption(""); // Réinitialisez l'option sélectionnée pour la prochaine question/joueur
        setShowCorrectMessage(false); // Assurez-vous de réinitialiser ceci aussi
    };

    const handleWin = (player) => {
        setPlayers(currentPlayers => currentPlayers.map(p => {
            if (p.name === player.name) {
                return { ...p, score: p.score + 1 };
            }
            return p;
        }));
    };

    if (!players || players.length === 0) {
        return <div>Chargement des joueurs...</div>;
    }

    if (!questionsData || questionsData.length === 0) {
        return <div>Chargement des questions...</div>;
    }

    return (
        <div className="qcmContainer">
            <div className="qcmFeedback">Actuellement, c'est au tour de : {players[currentPlayerIndex].name}</div>
            <h2 className="qcmTitle">{questionsData[currentQuestionIndex].question}</h2>
            <div className="qcmOptions">
                {questionsData[currentQuestionIndex].options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(option)} disabled={selectedOption !== ""} className="qcmOption">
                        {option}
                    </button>
                ))}
            </div>
            {selectedOption && showCorrectMessage && (
                <div className="qcmFeedbackMessage qcmCorrectAnswer">
                    <p>Bonne réponse !</p>
                    <button onClick={handleNextQuestion} className="qcmNextQuestionButton">Question suivante</button>
                </div>
            )}
            {selectedOption && correctAnswer && !showCorrectMessage && (
                <div className="qcmFeedbackMessage qcmWrongAnswer">
                    <p>Mauvaise réponse, la bonne réponse était : {correctAnswer}</p>
                    <button onClick={handleNextQuestion} className="qcmNextQuestionButton">Question suivante</button>
                </div>
            )}
        </div>
    );
};

export default Qcm;