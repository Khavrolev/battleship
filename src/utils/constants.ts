import { ShipType } from "./enums";
import { ShipLimits } from "./interfaces";

interface ShipsConfig {
  amount: number;
  position: string[];
}

export const BOARD_SIZE = { rows: 10, columns: 10, cellSize: 30 };
export const DELAY_TIMEOUT = 200;
export const MAX_ATTEMPTS_TO_INIT = 1000;
export const COORDINATES_SEPARATOR = "_";

export const BOARD_LIMITS: ShipLimits = {
  row: { min: 0, max: BOARD_SIZE.rows - 1 },
  column: { min: 0, max: BOARD_SIZE.columns - 1 },
};

export const SHIPS_ON_BOARD: { [key: string]: ShipsConfig } = {
  [ShipType.LShaped]: {
    amount: 1,
    position: [
      `0${COORDINATES_SEPARATOR}0`,
      `0${COORDINATES_SEPARATOR}1`,
      `1${COORDINATES_SEPARATOR}0`,
      `2${COORDINATES_SEPARATOR}0`,
    ],
  },
  [ShipType.IShaped]: {
    amount: 1,
    position: [
      `0${COORDINATES_SEPARATOR}0`,
      `1${COORDINATES_SEPARATOR}0`,
      `2${COORDINATES_SEPARATOR}0`,
      `3${COORDINATES_SEPARATOR}0`,
    ],
  },
  [ShipType.DotShaped]: { amount: 2, position: [`0${COORDINATES_SEPARATOR}0`] },
};
