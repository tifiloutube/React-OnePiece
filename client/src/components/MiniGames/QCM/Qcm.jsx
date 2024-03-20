import React, { useState, useEffect } from 'react';
import questionsData from './Qcm.json';

const Qcm = ({ onWin }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const question = questionsData[currentQuestionIndex];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const isCorrect = option === question.answer;
        setShowFeedback(true);

        if (isCorrect) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questionsData.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setShowFeedback(false);
                setSelectedOption(null);
            } else {
                onWin(score + (isCorrect ? 1 : 0));
            }
        }, 1000);
    };

    return (
        <div>
            <h2>{question.question}</h2>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
            {showFeedback && (
                <div>
                    {selectedOption === question.answer ? 'Correct!' : 'Incorrect!'}
                </div>
            )}
            <p>Score: {score}</p>
        </div>
    );
};

export default Qcm;