import {
  BOARD_LIMITS,
  BOARD_SIZE,
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

const getRandomBoolean = () => Math.random() < 0.5;

const getNeighbours = (cell: Coordinates) => {
  const topRow = cell.row - 1;
  const bottomRow = cell.row + 1;
  const leftColumn = cell.column - 1;
  const rightColumn = cell.column + 1;

  return [
    packCoordinates({ row: topRow, column: leftColumn }),
    packCoordinates({ row: topRow, column: cell.column }),
    packCoordinates({ row: topRow, column: rightColumn }),
    packCoordinates({ row: cell.row, column: leftColumn }),
    packCoordinates({ row: cell.row, column: rightColumn }),
    packCoordinates({ row: bottomRow, column: leftColumn }),
    packCoordinates({ row: bottomRow, column: cell.column }),
    packCoordinates({ row: bottomRow, column: rightColumn }),
  ];
};

const checkShipSize = (type: ShipType, vertical: boolean) => {
  if (
    (vertical &&
      (SHIPS_ON_BOARD[type].longSize > BOARD_SIZE.rows ||
        SHIPS_ON_BOARD[type].shortSize > BOARD_SIZE.columns)) ||
    (!vertical &&
      (SHIPS_ON_BOARD[type].longSize > BOARD_SIZE.columns ||
        SHIPS_ON_BOARD[type].shortSize > BOARD_SIZE.rows))
  ) {
    throw new Error("The size of ship is larger than board");
  }
};

const getLShipOnBoard = (): BoardData => {
  const vertical = getRandomBoolean();
  const incrementShortSide = getRandomBoolean();
  const incrementLongSide = getRandomBoolean();
  checkShipSize(ShipType.LShaped, vertical);

  const limits: ShipLimits = { ...BOARD_LIMITS };

  if (vertical) {
    if (incrementLongSide) {
      limits.row = {
        min: 0,
        max: BOARD_SIZE.rows - SHIPS_ON_BOARD[ShipType.LShaped].longSize,
      };
    } else {
      limits.row = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].longSize - 1,
        max: BOARD_SIZE.rows - 1,
      };
    }
    if (incrementShortSide) {
      limits.column = {
        min: 0,
        max: BOARD_SIZE.columns - SHIPS_ON_BOARD[ShipType.LShaped].shortSize,
      };
    } else {
      limits.column = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].shortSize - 1,
        max: BOARD_SIZE.columns - 1,
      };
    }
  } else {
    if (incrementShortSide) {
      limits.row = {
        min: 0,
        max: BOARD_SIZE.rows - SHIPS_ON_BOARD[ShipType.LShaped].shortSize,
      };
    } else {
      limits.row = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].shortSize - 1,
        max: BOARD_SIZE.rows - 1,
      };
    }
    if (incrementLongSide) {
      limits.column = {
        min: 0,
        max: BOARD_SIZE.columns - SHIPS_ON_BOARD[ShipType.LShaped].longSize,
      };
    } else {
      limits.column = {
        min: SHIPS_ON_BOARD[ShipType.LShaped].longSize - 1,
        max: BOARD_SIZE.columns - 1,
      };
    }
  }

  const coordinates = getRandomCoordinates(limits);

  const result: BoardData = {
    occupied: {},
    unacceptable: [],
    weight:
      SHIPS_ON_BOARD[ShipType.LShaped].shortSize +
      SHIPS_ON_BOARD[ShipType.LShaped].longSize -
      1,
  };

  for (let i = 1; i < SHIPS_ON_BOARD[ShipType.LShaped].longSize; i += 1) {
    const { row, column } = coordinates;

    const cell: Coordinates = { row, column };
    if (vertical) {
      if (incrementLongSide) {
        cell.row = row + i;
      } else {
        cell.row = row - i;
      }
    } else if (incrementLongSide) {
      cell.column = column + i;
    } else {
      cell.column = column - i;
    }

    result.occupied[packCoordinates(cell)] = true;
    result.unacceptable = [...result.unacceptable, ...getNeighbours(cell)];
  }

  for (let i = 0; i < SHIPS_ON_BOARD[ShipType.LShaped].shortSize; i += 1) {
    const { row, column } = coordinates;

    const cell: Coordinates = { row, column };
    if (vertical) {
      if (incrementShortSide) {
        cell.column = column + i;
      } else {
        cell.column = column - i;
      }
    } else if (incrementShortSide) {
      cell.row = row + i;
    } else {
      cell.row = row - i;
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

const getIorDotShipOnBoard = (type: ShipType): BoardData => {
  const vertical = getRandomBoolean();
  checkShipSize(type, vertical);

  const limits: ShipLimits = {
    row: {
      min: 0,
      max: vertical
        ? BOARD_SIZE.rows - SHIPS_ON_BOARD[type].longSize
        : BOARD_SIZE.rows - SHIPS_ON_BOARD[type].shortSize,
    },
    column: {
      min: 0,
      max: vertical
        ? BOARD_SIZE.columns - SHIPS_ON_BOARD[type].shortSize
        : BOARD_SIZE.columns - SHIPS_ON_BOARD[type].longSize,
    },
  };

  const coordinates = getRandomCoordinates(limits);

  const result: BoardData = {
    occupied: {},
    unacceptable: [],
    weight: SHIPS_ON_BOARD[type].shortSize * SHIPS_ON_BOARD[type].longSize,
  };
  for (let i = 0; i < SHIPS_ON_BOARD[type].longSize; i += 1) {
    for (let j = 0; j < SHIPS_ON_BOARD[type].shortSize; j += 1) {
      const { row, column } = coordinates;

      const cell: Coordinates = { row, column };
      if (vertical) {
        cell.row = row + i;
        cell.column = column + j;
      } else {
        cell.row = row + j;
        cell.column = column + i;
      }

      result.occupied[packCoordinates(cell)] = true;
      result.unacceptable = [...result.unacceptable, ...getNeighbours(cell)];
    }
  }

  result.unacceptable = [
    ...result.unacceptable.filter(
      (unacceptable) => !result.occupied[unacceptable],
    ),
  ];

  return result;
};

const getOneShipOnBoard = (type: string): BoardData => {
  switch (type) {
    case ShipType.LShaped:
      return getLShipOnBoard();
    case ShipType.IShaped:
      return getIorDotShipOnBoard(ShipType.IShaped);
    case ShipType.DotShaped:
      return getIorDotShipOnBoard(ShipType.DotShaped);
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

    try {
      const ships = types.reduce(
        (acc, type) => {
          let shipsOnBoard: BoardData = { ...acc };
          for (let i = 0; i < SHIPS_ON_BOARD[type].amount; i += 1) {
            const ship = getOneShipOnBoard(type);
            shipsOnBoard = {
              occupied: { ...shipsOnBoard.occupied, ...ship.occupied },
              unacceptable: [
                ...shipsOnBoard.unacceptable,
                ...ship.unacceptable,
              ],
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
    } catch (error) {
      continue;
    }
  }

  return result;
};

export default getShipsOnBoard;
