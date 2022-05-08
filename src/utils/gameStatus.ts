import { BOARD_SIZE } from "./constants";
import { CellStatus } from "./enums";
import { BoardState, ShipsPosition } from "./interfaces";

const isNoShot = (shots: BoardState) =>
  Object.keys(shots).length === BOARD_SIZE.rows * BOARD_SIZE.columns;

const isShipsSunk = (ships: ShipsPosition, shots: BoardState) =>
  Object.keys(ships).length ===
  Object.keys(shots).filter((shot) => shots[shot] === CellStatus.Dead).length;

export const isGameOver = (ships: ShipsPosition, shots: BoardState) =>
  isNoShot(shots) || isShipsSunk(ships, shots);

export const isGameNotStarted = (shots: BoardState) =>
  Object.keys(shots).length === 0;
