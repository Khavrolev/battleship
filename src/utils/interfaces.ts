import CellStatus from "./enums";

interface BoardState {
  [key: string]: CellStatus;
}

export default BoardState;
