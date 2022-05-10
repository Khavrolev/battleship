import classNames from "classnames";
import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { BOARD_SIZE } from "../../utils/constants";
import { packCoordinates } from "../../utils/coordinates";
import { CellStatus } from "../../utils/enums";
import { BoardState } from "../../utils/interfaces";
import classes from "./Board.module.css";

interface BoardProps {
  shots: BoardState;
}

const Board: FC<BoardProps> = ({ shots }) => {
  const { ships } = useAppSelector((state) => state.boardReducer);

  const getBoard = () => {
    const board = [];
    for (let i = 0; i < BOARD_SIZE.rows; i += 1) {
      for (let j = 0; j < BOARD_SIZE.columns; j += 1) {
        board.push(
          <div
            key={packCoordinates({ row: i, column: j })}
            style={{
              width: `${BOARD_SIZE.cellSize}px`,
              height: `${BOARD_SIZE.cellSize}px`,
            }}
            className={classNames(classes.board__cell, {
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
          />,
        );
      }
    }
    return board;
  };

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE.columns}, ${BOARD_SIZE.cellSize}px)`,
      }}
      className={classes.board}
    >
      {getBoard()}
    </div>
  );
};

export default Board;
