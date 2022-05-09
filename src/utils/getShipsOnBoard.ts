import {
  BOARD_LIMITS,
  BOARD_SIZE,
  COORDINATES_SEPARATOR,
  MAX_ATTEMPTS_TO_INIT,
  SHIPS_ON_BOARD,
} from "./constants";
import { getRandomCoordinates, packCoordinates } from "./coordinates";
import { ShipType } from "./enums";
import { Coordinates, ShipLimits, ShipsPosition } from "./interfaces";

interface BoardData {
  occupied: ShipsPosition;
  unacceptable: string[];
  weight: number;
}

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
    `${topRow}${COORDINATES_SEPARATOR}${leftColumn}`,
    `${topRow}${COORDINATES_SEPARATOR}${cell.column}`,
    `${topRow}${COORDINATES_SEPARATOR}${rightColumn}`,
    `${cell.row}${COORDINATES_SEPARATOR}${leftColumn}`,
    `${cell.row}${COORDINATES_SEPARATOR}${rightColumn}`,
    `${bottomRow}${COORDINATES_SEPARATOR}${leftColumn}`,
    `${bottomRow}${COORDINATES_SEPARATOR}${cell.column}`,
    `${bottomRow}${COORDINATES_SEPARATOR}${rightColumn}`,
  ];
};

const getLShipOnBoard = (): BoardData => {
  const vertical = getRandomBoolean();
  const incrementShortlSide = getRandomBoolean();
  const incrementLongSide = getRandomBoolean();
  const limits: ShipLimits = { ...BOARD_LIMITS };

  if (vertical) {
    if (incrementShortlSide) {
      limits.row = {
        min: 0,
        max: BOARD_SIZE.rows - SHIPS_ON_BOARD[ShipType.LShaped].shortSize + 1,
      };
    } else {
      limits.row = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].shortSize - 1,
        max: BOARD_SIZE.rows,
      };
    }
    if (incrementLongSide) {
      limits.column = {
        min: 0,
        max: BOARD_SIZE.columns - SHIPS_ON_BOARD[ShipType.LShaped].longSize + 1,
      };
    } else {
      limits.column = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].longSize - 1,
        max: BOARD_SIZE.columns,
      };
    }
  } else {
    if (incrementLongSide) {
      limits.row = {
        min: 0,
        max: BOARD_SIZE.rows - SHIPS_ON_BOARD[ShipType.LShaped].longSize + 1,
      };
    } else {
      limits.row = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].longSize - 1,
        max: BOARD_SIZE.rows,
      };
    }
    if (incrementShortlSide) {
      limits.column = {
        min: 0,
        max:
          BOARD_SIZE.columns - SHIPS_ON_BOARD[ShipType.LShaped].shortSize + 1,
      };
    } else {
      limits.column = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].shortSize - 1,
        max: BOARD_SIZE.columns,
      };
    }
  }

  const coordinates = getRandomCoordinates(limits);

  const result: BoardData = {
    occupied: {},
    unacceptable: [],
    weight: SHIPS_ON_BOARD[ShipType.LShaped].weight,
  };
  for (let i = 0; i < SHIPS_ON_BOARD[ShipType.LShaped].shortSize; i += 1) {
    const { row, column } = coordinates;

    let cell: Coordinates;
    if (vertical) {
      if (incrementShortlSide) {
        cell = { row: row + i, column };
      } else {
        cell = { row: row - i, column };
      }
    } else if (incrementShortlSide) {
      cell = { row, column: column + i };
    } else {
      cell = { row, column: column - i };
    }

    result.occupied[packCoordinates(cell)] = true;
    result.unacceptable = [...result.unacceptable, ...getNeighbours(cell)];
  }

  for (let i = 1; i < SHIPS_ON_BOARD[ShipType.LShaped].longSize; i += 1) {
    const { row, column } = coordinates;

    let cell: Coordinates;
    if (vertical) {
      if (incrementLongSide) {
        cell = { row, column: column + i };
      } else {
        cell = { row, column: column - i };
      }
    } else if (incrementLongSide) {
      cell = { row: row + i, column };
    } else {
      cell = { row: row - i, column };
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

const getIShipOnBoard = (): BoardData => {
  const vertical = getRandomBoolean();

  const limits: ShipLimits = {
    row: {
      min: 0,
      max: vertical
        ? BOARD_SIZE.rows - SHIPS_ON_BOARD[ShipType.IShaped].longSize
        : BOARD_SIZE.rows - SHIPS_ON_BOARD[ShipType.IShaped].shortSize,
    },
    column: {
      min: 0,
      max: vertical
        ? BOARD_SIZE.columns - SHIPS_ON_BOARD[ShipType.IShaped].shortSize
        : BOARD_SIZE.columns - SHIPS_ON_BOARD[ShipType.IShaped].longSize,
    },
  };

  const coordinates = getRandomCoordinates(limits);

  const result: BoardData = {
    occupied: {},
    unacceptable: [],
    weight: SHIPS_ON_BOARD[ShipType.IShaped].weight,
  };
  for (let i = 0; i < SHIPS_ON_BOARD[ShipType.IShaped].longSize; i += 1) {
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
    weight: SHIPS_ON_BOARD[ShipType.DotShaped].weight,
  };

  return result;
};

const getOneShipOnBoard = (type: string): BoardData => {
  switch (type) {
    case ShipType.LShaped:
      return getLShipOnBoard();
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
        let shipsOnBoard: BoardData = { ...acc };
        for (let i = 0; i < SHIPS_ON_BOARD[type].amount; i += 1) {
          const ship = getOneShipOnBoard(type);
          shipsOnBoard = {
            occupied: { ...shipsOnBoard.occupied, ...ship.occupied },
            unacceptable: [...shipsOnBoard.unacceptable, ...ship.unacceptable],
            weight: shipsOnBoard.weight + ship.weight,
          };
        }

        return shipsOnBoard;
      },
      { occupied: {}, unacceptable: [], weight: 0 } as BoardData,
    );

    const filtredUnacceptable = [...new Set(ships.unacceptable)].filter(
      (unacceptable) => ships.occupied[unacceptable],
    );

    if (
      filtredUnacceptable.length === 0 &&
      Object.keys(ships.occupied).length === ships.weight
    ) {
      result = { ...ships.occupied };
      generation.finished = true;
    }
  }

  return result;
};

export default getShipsOnBoard;
