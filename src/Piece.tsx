import blackBishopImage from './images/pieces/black-bishop.svg';
import blackKingImage from './images/pieces/black-king.svg';
import blackKnightImage from './images/pieces/black-knight.svg';
import blackPawnImage from './images/pieces/black-pawn.svg';
import blackQueenImage from './images/pieces/black-queen.svg';
import blackRookImage from './images/pieces/black-rook.svg';
import whiteBishopImage from './images/pieces/white-bishop.svg';
import whiteKingImage from './images/pieces/white-king.svg';
import whiteKnightImage from './images/pieces/white-knight.svg';
import whitePawnImage from './images/pieces/white-pawn.svg';
import whiteQueenImage from './images/pieces/white-queen.svg';
import whiteRookImage from './images/pieces/white-rook.svg';

import { capitalize, freeze } from './utils';

import './Piece.css';

export type PieceToken = keyof typeof pieceDefinitionsByToken;

export const enum PlayerColor {
  BLACK = 'black',
  WHITE = 'white',
}

const pieceDefinitionsByToken = (function () {
  const definePiece = (function () {
    interface PieceDefinition<
      Name extends string,
      Token extends string,
      Color extends PlayerColor,
      Image extends string
    > {
      readonly color: Color;
      readonly image: Image;
      readonly name: Name;
      readonly token: Token;
    }

    type PieceDefinitions<
      Name extends string,
      BlackToken extends string,
      WhiteToken extends string,
      BlackImage extends string,
      WhiteImage extends string
    > = {
      [Token in BlackToken]: PieceDefinition<Name, BlackToken, PlayerColor.BLACK, BlackImage>;
    } & {
      [Token in WhiteToken]: PieceDefinition<Name, WhiteToken, PlayerColor.WHITE, WhiteImage>;
    };

    function createPieceDefinition<
      Name extends string,
      Token extends string,
      Color extends PlayerColor,
      Image extends string
    >(
      name: Name,
      token: Token,
      color: Color,
      image: Image
    ): PieceDefinition<Name, Token, Color, Image> {
      return freeze({ __proto__: null, color, image, name, token });
    }

    function definePiece<
      Name extends string,
      BlackToken extends string,
      WhiteToken extends string,
      BlackImage extends string,
      WhiteImage extends string
    >(
      name: Name,
      blackToken: BlackToken,
      whiteToken: WhiteToken,
      blackImage: BlackImage,
      whiteImage: WhiteImage
    ): PieceDefinitions<Name, BlackToken, WhiteToken, BlackImage, WhiteImage> {
      return freeze({
        __proto__: null,
        [blackToken]: createPieceDefinition(name, blackToken, PlayerColor.BLACK, blackImage),
        [whiteToken]: createPieceDefinition(name, whiteToken, PlayerColor.WHITE, whiteImage),
      }) as any as PieceDefinitions<Name, BlackToken, WhiteToken, BlackImage, WhiteImage>;
    }

    return definePiece;
  })();

  const pieces = freeze({
    __proto__: null,
    ...definePiece('bishop', 'b', 'B', blackBishopImage, whiteBishopImage),
    ...definePiece('king', 'k', 'K', blackKingImage, whiteKingImage),
    ...definePiece('knight', 'n', 'N', blackKnightImage, whiteKnightImage),
    ...definePiece('pawn', 'p', 'P', blackPawnImage, whitePawnImage),
    ...definePiece('queen', 'q', 'Q', blackQueenImage, whiteQueenImage),
    ...definePiece('rook', 'r', 'R', blackRookImage, whiteRookImage),
  });

  return pieces as Omit<typeof pieces, '__proto__'>;
})();

function Piece({ token }: { token: PieceToken }) {
  const { color, image, name } = pieceDefinitionsByToken[token];
  const classes = `${color} ${name} piece`;
  const description = `${capitalize(color)} ${name}`;
  return (
    <img src={image} alt={description} className={classes} />
  );
}

export default Piece;
