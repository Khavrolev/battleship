import { ShipType } from "./enums";
import { BoardSize, SettingsState, ShipsConfig } from "./interfaces";

export const COORDINATES_SEPARATOR = "_";
export const LOCAL_STORAGE_NAME = "settings_battleship";

const BOARD_SIZE: BoardSize = { rows: 10, columns: 10, cellSize: 30 };
const SHIPS_ON_BOARD: ShipsConfig = {
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
const DELAY_TIMEOUT = 200;
const MAX_ATTEMPTS_TO_INIT = 1000;

export const defaultSettings: SettingsState = {
  boardSize: BOARD_SIZE,
  shipsOnBoard: SHIPS_ON_BOARD,
  delayTimeout: DELAY_TIMEOUT,
  maxAttemptsToInit: MAX_ATTEMPTS_TO_INIT,
};
