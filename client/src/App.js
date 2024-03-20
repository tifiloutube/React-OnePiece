import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import GamesPage from './components/GamesPage/GamesPage';
import WikiPage from './components/WikiPage/WikiPage';

function App() {
    const [players, setPlayers] = useState([]);

    const handlePlayersSet = (playerNames) => {
        const newPlayers = playerNames.map(name => ({ name, score: 0 }));
        setPlayers(newPlayers);
    };

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage onPlayersSet={handlePlayersSet} players={players} />} />
                <Route path="/jeux" element={<GamesPage players={players} setPlayers={setPlayers} />} />
                <Route path="/wiki" element={<WikiPage />} />
            </Routes>
        </div>
    );
}

export default App;