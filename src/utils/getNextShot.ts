import { getNewCoordinates } from "./coordinates";
import { CellStatus } from "./enums";
import { BoardShots, ShipsPosition } from "./interfaces";

const getNextShot = (ships: ShipsPosition, shots: BoardShots): BoardShots => {
  const newCoordinates = getNewCoordinates(shots);

  return {
    ...shots,
    [newCoordinates]: ships[newCoordinates]
      ? CellStatus.Dead
      : CellStatus.Missed,
  };
};

export default getNextShot;
