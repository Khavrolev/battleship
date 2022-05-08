import {
  BOARD_LIMITS,
  BOARD_SIZE,
  SHIPS_ON_BOARD,
  SHIPS_SIZE,
} from "./constants";
import { getRandomCoordinates, packCoordinates } from "./coordinates";
import { ShipType } from "./enums";
import { Coordinates, ShipLimits, ShipsPosition } from "./interfaces";

// interface LShipConfig {
//   vertical: boolean;
//   rightToLine: boolean;
//   topToLine: boolean;
// }

// const mockShips = {
//   "0-0": true,
//   "0-1": true,
//   "0-2": true,
//   "1-2": true,
//   "4-0": true,
//   "5-0": true,
//   "6-0": true,
//   "7-0": true,
//   "5-5": true,
//   "7-7": true,
// };
const getRandomBoolean = () => Math.random() < 0.5;

// const getLShipOnBoard = (): ShipsPosition => {
//   const config: LShipConfig = {
//     vertical: getRandomBoolean(),
//     rightToLine: getRandomBoolean(),
//     topToLine: getRandomBoolean(),
//   };

//   const coordinates = {
//     row: getRandomInt(BOARD_SIZE.rows),
//     column: getRandomInt(BOARD_SIZE.columns),
//   };

//   const ship = {};
//   for (let i = 0; i < SHIPS_SIZE[ShipType.LShaped].longSize; i += 1) {
//     if (config.vertical) {
//     }
//   }
// };

const getIShipOnBoard = (): ShipsPosition => {
  const vertical = getRandomBoolean();

  const limits: ShipLimits = {
    row: {
      min: 0,
      max: vertical
        ? BOARD_SIZE.rows - SHIPS_SIZE[ShipType.IShaped].longSize
        : BOARD_SIZE.rows - SHIPS_SIZE[ShipType.IShaped].shortSize,
    },
    column: {
      min: 0,
      max: vertical
        ? BOARD_SIZE.columns - SHIPS_SIZE[ShipType.IShaped].shortSize
        : BOARD_SIZE.columns - SHIPS_SIZE[ShipType.IShaped].longSize,
    },
  };

  const coordinates: Coordinates = getRandomCoordinates(limits);

  const ship: ShipsPosition = {};
  for (let i = 0; i < SHIPS_SIZE[ShipType.IShaped].longSize; i += 1) {
    const { row, column } = coordinates;

    let key;
    if (vertical) {
      key = packCoordinates({ row: row + i, column });
    } else {
      key = packCoordinates({ row, column: column + i });
    }

    ship[key] = true;
  }

  return ship;
};

const getDotShipOnBoard = (): ShipsPosition => {
  const packedCoordinates = packCoordinates(getRandomCoordinates(BOARD_LIMITS));

  return { [packedCoordinates]: true };
};

const getOneShipOnBoard = (type: string): ShipsPosition => {
  switch (type) {
    // case ShipType.LShaped:
    //   return getLShipOnBoard();
    case ShipType.IShaped:
      return getIShipOnBoard();
    case ShipType.DotShaped:
      return getDotShipOnBoard();
    default:
      throw new Error("Wrong ship type");
  }
};

const getShipsOnBoard = (): ShipsPosition => {
  const types = Object.keys(SHIPS_ON_BOARD);

  const ships = types.reduce((acc, type) => {
    let shipsOfThisType: ShipsPosition = {};
    for (let i = 0; i < SHIPS_ON_BOARD[type]; i += 1) {
      const ship = getOneShipOnBoard(type);
      shipsOfThisType = { ...shipsOfThisType, ...ship };
    }

    return { ...acc, ...shipsOfThisType };
  }, {});

  return ships;
};

export default getShipsOnBoard;
