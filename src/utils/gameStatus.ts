import { CellStatus } from "./enums";
import { BoardShots, BoardSize, ShipsPosition } from "./interfaces";

const isNoShot = (shots: BoardShots, boardSize: BoardSize) =>
  Object.keys(shots).length === boardSize.rows * boardSize.columns;

const isShipsSunk = (ships: ShipsPosition, shots: BoardShots) =>
  Object.keys(ships).length ===
  Object.keys(shots).filter((shot) => shots[shot] === CellStatus.Dead).length;

export const isGameCannotBeStarted = (ships: ShipsPosition) =>
  Object.keys(ships).length === 0;

export const isGameOver = (
  ships: ShipsPosition,
  shots: BoardShots,
  boardSize: BoardSize,
) => isNoShot(shots, boardSize) || isShipsSunk(ships, shots);
