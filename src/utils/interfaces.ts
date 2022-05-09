import { CellStatus } from "./enums";

export interface BoardState {
  [key: string]: CellStatus;
}

export interface ShipsPosition {
  [key: string]: boolean;
}

export interface Coordinates {
  row: number;
  column: number;
}

export interface ShipLimits {
  row: { min: number; max: number };
  column: { min: number; max: number };
}
