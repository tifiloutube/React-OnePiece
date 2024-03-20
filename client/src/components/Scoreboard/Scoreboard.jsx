import React from 'react';
import './Scoreboard.css'

function Scoreboard({ players }) {
    return (
        <div className="scoreboard">
            <h2 className="scoreboard__title">Tableau des Scores</h2>
            <table className="scoreboard__table">
                <thead>
                <tr>
                    <th>Joueur</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                    <tr key={index}>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Scoreboard;