import { useState } from 'react';
import Board from './Board';
import { PlayerColor } from './Piece';

import './App.css';

function App() {
  const [perspective, setPerspective] = useState(PlayerColor.WHITE);

  function flip() {
    setPerspective(perspective === PlayerColor.WHITE ? PlayerColor.BLACK : PlayerColor.WHITE);
  }

  const tokens = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
  ] as const;
  return (
    <div className="app">
      <Board tokens={tokens} perspective={perspective} />
      <div className="app-test">
        <button onClick={flip}>Flip</button>
      </div>
    </div>
  );
}

export default App;
