import { type PieceToken, PlayerColor } from './Piece';
import Square from './Square';
import { isArray } from './utils';

import './Board.css';

function Board({ perspective, tokens }: { perspective?: PlayerColor, tokens?: readonly (PieceToken | null | undefined)[] | null }) {
  if ((isArray as (arg: any) => arg is readonly any[])(tokens)) {
    let { length } = tokens;
    if (length < 64) {
      const newTokens = tokens.slice();
      do {
        newTokens[length++] = null;
      } while (length < 64);
      tokens = newTokens;
    } else if (length > 64) {
      tokens = tokens.slice(0, 64);
    }
  } else {
    tokens = Array(64);
  }
  const squares = tokens.map((token, index) => <Square index={index} token={token} key={index} />);
  if (!perspective) {
    perspective = PlayerColor.WHITE;
  } else if (perspective === PlayerColor.BLACK) {
    squares.reverse();
  }
  return (
    <div className="board">
      <div className="board-squares">
        {squares}
      </div>
    </div>
  );
}

export default Board;
