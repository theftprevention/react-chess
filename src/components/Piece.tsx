import blackBishopImage from '../assets/black-bishop.svg';
import blackKingImage from '../assets/black-king.svg';
import blackKnightImage from '../assets/black-knight.svg';
import blackPawnImage from '../assets/black-pawn.svg';
import blackQueenImage from '../assets/black-queen.svg';
import blackRookImage from '../assets/black-rook.svg';
import whiteBishopImage from '../assets/white-bishop.svg';
import whiteKingImage from '../assets/white-king.svg';
import whiteKnightImage from '../assets/white-knight.svg';
import whitePawnImage from '../assets/white-pawn.svg';
import whiteQueenImage from '../assets/white-queen.svg';
import whiteRookImage from '../assets/white-rook.svg';

import { capitalize, freeze } from '../utils';

import './Piece.scss';

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
      }) as unknown as PieceDefinitions<Name, BlackToken, WhiteToken, BlackImage, WhiteImage>;
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

export default function Piece({ token }: { token: PieceToken }) {
  const { color, image, name } = pieceDefinitionsByToken[token];
  const classes = `${color} ${name} piece`;
  const description = `${capitalize(color)} ${name}`;
  return (
    <img src={image} alt={description} className={classes} />
  );
}
