import { BOARD_LIMITS } from "./constants";
import { BoardState, Coordinates, ShipLimits } from "./interfaces";

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
  Math.ceil(min);

export const packCoordinates = (coordinates: Coordinates) =>
  `${coordinates.row}-${coordinates.column}`;

export const getRandomCoordinates = (limits: ShipLimits) => {
  return {
    row: getRandomInt(limits.row.min, limits.row.max),
    column: getRandomInt(limits.column.min, limits.column.max),
  };
};

export const getNewCoordinates = (shots: BoardState) => {
  let coordinates = "";

  do {
    coordinates = packCoordinates(getRandomCoordinates(BOARD_LIMITS));
  } while (shots[coordinates]);

  return coordinates;
};
