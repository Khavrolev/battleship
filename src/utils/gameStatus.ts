import { BOARD_SIZE } from "./constants";
import { CellStatus } from "./enums";
import { BoardShots, ShipsPosition } from "./interfaces";

const isNoShot = (shots: BoardShots) =>
  Object.keys(shots).length === BOARD_SIZE.rows * BOARD_SIZE.columns;

const isShipsSunk = (ships: ShipsPosition, shots: BoardShots) =>
  Object.keys(ships).length ===
  Object.keys(shots).filter((shot) => shots[shot] === CellStatus.Dead).length;

export const isGameCannotBeStarted = (ships: ShipsPosition) =>
  Object.keys(ships).length === 0;

export const isGameOver = (ships: ShipsPosition, shots: BoardShots) =>
  isNoShot(shots) || isShipsSunk(ships, shots);

export const isGameNotStarted = (shots: BoardShots) =>
  Object.keys(shots).length === 0;
