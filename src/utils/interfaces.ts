import { CellStatus } from "./enums";

export interface BoardShots {
  [key: string]: CellStatus;
}

export interface ShipsPosition {
  [key: string]: boolean;
}

export interface Coordinates {
  row: number;
  column: number;
}
export interface ShipsConfig {
  [key: string]: { amount: number; position: string[] };
}

export interface BoardSize {
  rows: number;
  columns: number;
  cellSize: number;
}

export interface SettingsState {
  boardSize: BoardSize;
  shipsOnBoard: ShipsConfig;
  delayTimeout: number;
  maxAttemptsToInit: number;
}

export interface ShipLimits {
  row: { min: number; max: number };
  column: { min: number; max: number };
}
