import {
  getRandomCoordinates,
  packCoordinates,
  parseCoordinates,
} from "./coordinates";
import { ShipType } from "./enums";
import {
  BoardSize,
  Coordinates,
  ShipLimits,
  ShipsConfig,
  ShipsPosition,
} from "./interfaces";

interface BoardData {
  occupied: ShipsPosition;
  unacceptable: string[];
  weight: number;
}

const getRandomBoolean = () => Math.random() < 0.5;

const getBiggestCoordinates = (shipsCoordinates: Coordinates[]) => {
  return shipsCoordinates.reduce(
    (acc, coordinates) => {
      if (coordinates.row < 0 || coordinates.column < 0) {
        throw new Error("Coordinates could't be negative");
      }

      const newCoordinates = { ...acc };
      if (coordinates.row > acc.row) {
        newCoordinates.row = coordinates.row;
      }
      if (coordinates.column > acc.column) {
        newCoordinates.column = coordinates.column;
      }

      return newCoordinates;
    },
    { row: 0, column: 0 },
  );
};

const getReversedCoordinates = (coordinates: Coordinates) => {
  const { row, column } = coordinates;
  return { row: column, column: row };
};

const checkShipSize = (
  biggestCoordinates: Coordinates,
  boardSize: BoardSize,
) => {
  if (
    biggestCoordinates.column > boardSize.columns - 1 ||
    biggestCoordinates.row > boardSize.rows - 1
  ) {
    throw new Error("The size of ship is larger than board");
  }
};

const getNeighbours = (coordinates: Coordinates) => {
  const topRow = coordinates.row - 1;
  const bottomRow = coordinates.row + 1;
  const leftColumn = coordinates.column - 1;
  const rightColumn = coordinates.column + 1;

  return [
    packCoordinates({ row: topRow, column: leftColumn }),
    packCoordinates({ row: topRow, column: coordinates.column }),
    packCoordinates({ row: topRow, column: rightColumn }),
    packCoordinates({ row: coordinates.row, column: leftColumn }),
    packCoordinates({ row: coordinates.row, column: rightColumn }),
    packCoordinates({ row: bottomRow, column: leftColumn }),
    packCoordinates({ row: bottomRow, column: coordinates.column }),
    packCoordinates({ row: bottomRow, column: rightColumn }),
  ];
};

const getShipOnBoard = (
  type: string,
  boardSize: BoardSize,
  shipsOnBoard: ShipsConfig,
): BoardData => {
  if (!(type in ShipType)) {
    throw new Error("Wrong ship type");
  }

  let shipsCoordinates = shipsOnBoard[type].position.map((cell) =>
    parseCoordinates(cell),
  );

  const reverse = getRandomBoolean();
  const verticalMirroring = getRandomBoolean();
  const horizontalMirroring = getRandomBoolean();

  const biggestCoordinates = reverse
    ? getReversedCoordinates(getBiggestCoordinates(shipsCoordinates))
    : getBiggestCoordinates(shipsCoordinates);

  checkShipSize(biggestCoordinates, boardSize);

  shipsCoordinates = shipsCoordinates.reduce((acc, coordinates) => {
    let { row, column } = reverse
      ? getReversedCoordinates(coordinates)
      : coordinates;
    if (verticalMirroring) {
      column = biggestCoordinates.column - column;
    }
    if (horizontalMirroring) {
      row = biggestCoordinates.row - row;
    }

    const newCoordinates: Coordinates = {
      row,
      column,
    };

    return [...acc, newCoordinates];
  }, [] as Coordinates[]);

  const limits: ShipLimits = {
    row: {
      min: 0,
      max: boardSize.rows - biggestCoordinates.row - 1,
    },
    column: {
      min: 0,
      max: boardSize.columns - biggestCoordinates.column - 1,
    },
  };

  const startCoordinates = getRandomCoordinates(limits);

  const result = shipsCoordinates.reduce(
    (acc, coordinates) => {
      const { occupied, unacceptable, weight } = { ...acc };
      const newCoordinates = {
        row: coordinates.row + startCoordinates.row,
        column: coordinates.column + startCoordinates.column,
      };

      return {
        occupied: { ...occupied, [packCoordinates(newCoordinates)]: true },
        unacceptable: [...unacceptable, ...getNeighbours(newCoordinates)],
        weight,
      };
    },
    {
      occupied: {},
      unacceptable: [],
      weight: shipsOnBoard[type].position.length,
    } as BoardData,
  );

  result.unacceptable = [
    ...result.unacceptable.filter(
      (unacceptable) => !result.occupied[unacceptable],
    ),
  ];

  return result;
};

const getShipsOnBoard = (
  maxAttemptsToInit: number,
  boardSize: BoardSize,
  shipsOnBoard: ShipsConfig,
): ShipsPosition => {
  const types = Object.keys(shipsOnBoard);
  const generation = { finished: false, counter: 0 };
  let result: ShipsPosition = {};

  while (!generation.finished) {
    generation.counter += 1;

    if (generation.counter === maxAttemptsToInit) {
      return {};
    }

    try {
      const ships = types.reduce(
        (acc, type) => {
          let { occupied, unacceptable, weight } = { ...acc };
          for (let i = 0; i < shipsOnBoard[type].amount; i += 1) {
            const ship = getShipOnBoard(type, boardSize, shipsOnBoard);
            occupied = { ...occupied, ...ship.occupied };
            unacceptable = [...unacceptable, ...ship.unacceptable];
            weight += ship.weight;
          }

          return { occupied, unacceptable, weight };
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
