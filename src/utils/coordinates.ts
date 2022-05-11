import { BOARD_LIMITS, COORDINATES_SEPARATOR } from "./constants";
import { BoardShots, Coordinates, ShipLimits } from "./interfaces";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
  Math.ceil(min);

export const getRandomCoordinates = (limits: ShipLimits): Coordinates => {
  return {
    row: getRandomInt(limits.row.min, limits.row.max),
    column: getRandomInt(limits.column.min, limits.column.max),
  };
};

export const packCoordinates = (coordinates: Coordinates) =>
  `${coordinates.row}${COORDINATES_SEPARATOR}${coordinates.column}`;

export const parseCoordinates = (cell: string): Coordinates => {
  const cellArray = cell.split(COORDINATES_SEPARATOR);

  if (cellArray.length !== 2 || cellArray.includes("")) {
    throw new Error(`Wrong input`);
  }

  return { row: +cellArray[0], column: +cellArray[1] };
};

export const getNewCoordinates = (shots: BoardShots) => {
  let coordinates = "";

  do {
    coordinates = packCoordinates(getRandomCoordinates(BOARD_LIMITS));
  } while (shots[coordinates]);

  return coordinates;
};
