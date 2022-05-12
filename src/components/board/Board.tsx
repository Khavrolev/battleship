import classNames from "classnames";
import { useAppSelector } from "../../hooks/redux";
import { packCoordinates } from "../../utils/coordinates";
import { CellStatus } from "../../utils/enums";
import classes from "./Board.module.css";

const Board = () => {
  const { ships, shots } = useAppSelector((state) => state.boardReducer);
  const { boardSize } = useAppSelector((state) => state.settingsReducer);

  const getNumber = (i: number, j: number): string => {
    if (i === -1 && j !== -1) {
      return `${j + 1}`;
    }
    if (j === -1 && i !== -1) {
      return `${i + 1}`;
    }

    return "";
  };

  const getBoard = () => {
    const board = [];
    for (let i = -1; i < boardSize.rows; i += 1) {
      for (let j = -1; j < boardSize.columns; j += 1) {
        board.push(
          <div
            key={packCoordinates({ row: i, column: j })}
            style={{
              width: `${boardSize.cellSize}px`,
              height: `${boardSize.cellSize}px`,
            }}
            className={classNames(classes.board__cell, {
              [classes.board__cell_number]: i === -1 || j === -1,
              [classes.board__cell_alive]:
                ships[packCoordinates({ row: i, column: j })] &&
                !shots[packCoordinates({ row: i, column: j })],
              [classes.board__cell_dead]:
                shots[packCoordinates({ row: i, column: j })] ===
                CellStatus.Dead,
              [classes.board__cell_missed]:
                shots[packCoordinates({ row: i, column: j })] ===
                CellStatus.Missed,
            })}
            data-row={i}
            data-column={j}
          >
            {getNumber(i, j)}
          </div>,
        );
      }
    }
    return board;
  };

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${boardSize.columns + 1}, auto)`,
      }}
      className={classes.board}
    >
      {getBoard()}
    </div>
  );
};

export default Board;
