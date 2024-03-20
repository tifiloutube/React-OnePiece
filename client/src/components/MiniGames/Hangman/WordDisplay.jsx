import React from 'react';

const WordDisplay = ({ word, guesses }) => (
    <div>
        {word.split('').map((letter, index) => (
            guesses.includes(letter) ? letter : "_"
        )).join(' ')}
    </div>
);

export default WordDisplay;
