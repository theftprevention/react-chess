import Piece, { type PieceToken } from './Piece';
import './Square.css';

export type SquareFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type SquareName = `${SquareFile}${SquareRank}`;
export type SquareRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

function Square({ index, token }: { index: number, token?: PieceToken | null }) {
  const file: SquareFile = String.fromCharCode(97 + (index % 8)) as SquareFile;
  const rank: SquareRank = (Math.floor((63 - index) / 8) + 1) as SquareRank;
  const classes = `${rank % 2 ? (index % 2 ? 'white' : 'black') : (index % 2 ? 'black' : 'white')} square`;
  const name: SquareName = `${file}${rank}`;
  const piece = token ? <Piece token={token} /> : null;
  return (
    <div className={classes} id={name}>{piece}</div>
  );
}

export default Square;
