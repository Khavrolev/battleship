import {
  BOARD_LIMITS,
  BOARD_SIZE,
  MAX_ATTEMPTS_TO_INIT,
  SHIPS_ON_BOARD,
  SHIPS_SIZE,
} from "./constants";
import { getRandomCoordinates, packCoordinates } from "./coordinates";
import { ShipType } from "./enums";
import { Coordinates, ShipLimits, ShipsPosition } from "./interfaces";

interface BoardData {
  occupied: ShipsPosition;
  unacceptable: string[];
}

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

const getNeighbours = (cell: Coordinates) => {
  const topRow = cell.row - 1;
  const bottomRow = cell.row + 1;
  const leftColumn = cell.column - 1;
  const rightColumn = cell.column + 1;

  return [
    `${topRow}-${leftColumn}`,
    `${topRow}-${cell.column}`,
    `${topRow}-${rightColumn}`,
    `${cell.row}-${leftColumn}`,
    `${cell.row}-${rightColumn}`,
    `${bottomRow}-${leftColumn}`,
    `${bottomRow}-${cell.column}`,
    `${bottomRow}-${rightColumn}`,
  ];
};

// const getLShipOnBoard = () :BoardData => {
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

const getIShipOnBoard = (): BoardData => {
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

  const coordinates = getRandomCoordinates(limits);

  const result: BoardData = { occupied: {}, unacceptable: [] };
  for (let i = 0; i < SHIPS_SIZE[ShipType.IShaped].longSize; i += 1) {
    const { row, column } = coordinates;

    let cell: Coordinates;
    if (vertical) {
      cell = { row: row + i, column };
    } else {
      cell = { row, column: column + i };
    }

    result.occupied[packCoordinates(cell)] = true;
    result.unacceptable = [...result.unacceptable, ...getNeighbours(cell)];
  }

  result.unacceptable = [
    ...result.unacceptable.filter(
      (unacceptable) => !result.occupied[unacceptable],
    ),
  ];

  return result;
};

const getDotShipOnBoard = (): BoardData => {
  const cell = getRandomCoordinates(BOARD_LIMITS);
  const result: BoardData = {
    occupied: { [packCoordinates(cell)]: true },
    unacceptable: [...getNeighbours(cell)],
  };

  return result;
};

const getOneShipOnBoard = (type: string) => {
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
  const generation = { finished: false, counter: 0 };
  let result: ShipsPosition = {};

  while (!generation.finished) {
    generation.counter += 1;

    if (generation.counter === MAX_ATTEMPTS_TO_INIT) {
      return {};
    }

    const ships = types.reduce(
      (acc, type) => {
        let shipsOfThisType: BoardData = { occupied: {}, unacceptable: [] };
        for (let i = 0; i < SHIPS_ON_BOARD[type]; i += 1) {
          const ship = getOneShipOnBoard(type);
          shipsOfThisType = {
            occupied: { ...shipsOfThisType.occupied, ...ship.occupied },
            unacceptable: [
              ...shipsOfThisType.unacceptable,
              ...ship.unacceptable,
            ],
          };
        }

        return {
          occupied: { ...acc.occupied, ...shipsOfThisType.occupied },
          unacceptable: [...acc.unacceptable, ...shipsOfThisType.unacceptable],
        };
      },
      { occupied: {}, unacceptable: [] } as BoardData,
    );

    const filtredUnacceptable = [...new Set(ships.unacceptable)].filter(
      (unacceptable) => ships.occupied[unacceptable],
    );
    console.log([...new Set(ships.unacceptable)]);
    console.log(filtredUnacceptable);
    console.log(ships.occupied);
    if (filtredUnacceptable.length === 0) {
      result = { ...ships.occupied };
      generation.finished = true;
    }
  }

  return result;
};

export default getShipsOnBoard;
