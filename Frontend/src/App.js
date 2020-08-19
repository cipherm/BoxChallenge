import React, { useState } from 'react';
import './App.css';

import BoxScore from "./Components/BoxScore"

function App() {
  const [league, setLeague] = useState("nba");
  console.log(league)
  const handleChange = (e) => {
    setLeague(e.target.value);
  }

  return (
    <div className="App-header">
      <h1 style={{ color: "orange" }}>Box Score</h1>
      <select value={league} onChange={handleChange}>
        <option value="mlb">MLB</option>
        <option value="nba">NBA</option>
      </select>
      <BoxScore league={league} />
    </div>
  );
}

export default App;
