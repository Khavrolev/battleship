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
