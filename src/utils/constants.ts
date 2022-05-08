import { ShipType } from "./enums";

export const BOARD_SIZE = { rows: 10, columns: 10, cellSize: 30 };
export const DELAY_TIMEOUT = 200;
export const SHIPS_ON_BOARD = {
  [ShipType.LShaped]: 1,
  [ShipType.IShaped]: 1,
  [ShipType.DotShaped]: 2,
};
