import { BOARD_SIZE } from "./constants";
import { BoardState, Coordinates } from "./interfaces";

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const parseCoordinates = (cell: string): Coordinates => {
  const cellArray = cell.split("-");

  if (cellArray.length !== 2 || cellArray.includes("")) {
    throw new Error(`Wrong input`);
  }

  return { row: +cellArray[0], column: +cellArray[1] };
};

const packCoordinates = (coordinates: Coordinates) =>
  `${coordinates.row}-${coordinates.column}`;

export const getNewCoordinates = (shots: BoardState) => {
  let coordinates = "";

  do {
    const row = getRandomInt(BOARD_SIZE.rows);
    const column = getRandomInt(BOARD_SIZE.columns);
    coordinates = packCoordinates({ row, column });
  } while (shots[coordinates]);

  return coordinates;
};
