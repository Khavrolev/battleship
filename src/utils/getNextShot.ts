import { getNewCoordinates } from "./coordinates";
import { CellStatus } from "./enums";
import { BoardState, ShipsPosition } from "./interfaces";

const getNextShot = (ships: ShipsPosition, shots: BoardState) => {
  const newCoordinates = getNewCoordinates(shots);

  return {
    ...shots,
    [newCoordinates]: ships[newCoordinates]
      ? CellStatus.Dead
      : CellStatus.Missed,
  };
};

export default getNextShot;
