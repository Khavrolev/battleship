import { ShipType } from "./enums";

export const BOARD_SIZE = { rows: 10, columns: 10, cellSize: 30 };
export const DELAY_TIMEOUT = 200;

export const BOARD_LIMITS = {
  row: { min: 0, max: BOARD_SIZE.rows },
  column: { min: 0, max: BOARD_SIZE.columns },
};

export const SHIPS_ON_BOARD: { [key: string]: number } = {
  // [ShipType.LShaped]: 1,
  [ShipType.IShaped]: 1,
  [ShipType.DotShaped]: 2,
};

export const SHIPS_SIZE = {
  [ShipType.LShaped]: { longSize: 3, shortSize: 2 },
  [ShipType.IShaped]: { longSize: 4, shortSize: 1 },
};
