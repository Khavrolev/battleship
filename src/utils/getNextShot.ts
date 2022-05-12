import { getNewCoordinates } from "./coordinates";
import { CellStatus } from "./enums";
import { BoardShots, ShipLimits, ShipsPosition } from "./interfaces";

const getNextShot = (
  ships: ShipsPosition,
  shots: BoardShots,
  limits: ShipLimits,
): BoardShots => {
  const newCoordinates = getNewCoordinates(shots, limits);

  return {
    ...shots,
    [newCoordinates]: ships[newCoordinates]
      ? CellStatus.Dead
      : CellStatus.Missed,
  };
};

export default getNextShot;
