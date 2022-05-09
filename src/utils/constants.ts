import { ShipType } from "./enums";
import { ShipLimits } from "./interfaces";

interface ShipsConfig {
  amount: number;
  longSize: number;
  shortSize: number;
  weight: number;
}

export const BOARD_SIZE = { rows: 10, columns: 10, cellSize: 30 };
export const DELAY_TIMEOUT = 200;
export const MAX_ATTEMPTS_TO_INIT = 1000;
export const COORDINATES_SEPARATOR = "_";

export const BOARD_LIMITS: ShipLimits = {
  row: { min: 0, max: BOARD_SIZE.rows },
  column: { min: 0, max: BOARD_SIZE.columns },
};

export const SHIPS_ON_BOARD: { [key: string]: ShipsConfig } = {
  [ShipType.LShaped]: { amount: 1, longSize: 3, shortSize: 2, weight: 4 },
  [ShipType.IShaped]: { amount: 1, longSize: 4, shortSize: 1, weight: 4 },
  [ShipType.DotShaped]: { amount: 2, longSize: 1, shortSize: 1, weight: 1 },
};
