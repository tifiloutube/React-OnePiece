import React, { useState, useEffect } from 'react';
import questionsData from './Qcm.json';
import './Qcm.css';

const Qcm = ({ players, setPlayers }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [showCorrectMessage, setShowCorrectMessage] = useState(false);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    useEffect(() => {
        setSelectedOption("");
        setCorrectAnswer("");
        setShowCorrectMessage(false);
    }, [currentQuestionIndex]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const correctOption = questionsData[currentQuestionIndex].answer;
        if (option === correctOption) {
            handleWin(players[currentPlayerIndex]);
            setShowCorrectMessage(true);
            setCorrectAnswer(correctOption);
        } else {
            setCorrectAnswer(correctOption);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log("Fin du quiz");
            setCurrentQuestionIndex(0);
            setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        }
        setSelectedOption("");
        setShowCorrectMessage(false);
    };

    const handleWin = (player) => {
        setPlayers(currentPlayers => currentPlayers.map(p => {
            if (p.name === player.name) {
                return { ...p, score: p.score + 1 };
            }
            return p;
        }));
    };

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