import classNames from "classnames";
import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { BOARD_SIZE, COORDINATES_SEPARATOR } from "../../utils/constants";
import { CellStatus } from "../../utils/enums";
import { BoardState } from "../../utils/interfaces";
import classes from "./Board.module.css";

interface BoardProps {
  shots: BoardState;
}

const Board: FC<BoardProps> = ({ shots }) => {
  const { ships } = useAppSelector((state) => state.shipsReducer);

  const getBoard = () => {
    const board = [];
    for (let i = 0; i < BOARD_SIZE.rows; i += 1) {
      for (let j = 0; j < BOARD_SIZE.columns; j += 1) {
        board.push(
          <div
            key={`${i}${COORDINATES_SEPARATOR}${j}`}
            style={{
              width: `${BOARD_SIZE.cellSize}px`,
              height: `${BOARD_SIZE.cellSize}px`,
            }}
            className={classNames(classes.board__cell, {
              [classes.board__cell_alive]:
                ships[`${i}${COORDINATES_SEPARATOR}${j}`] &&
                !shots[`${i}${COORDINATES_SEPARATOR}${j}`],
              [classes.board__cell_dead]:
                shots[`${i}${COORDINATES_SEPARATOR}${j}`] === CellStatus.Dead,
              [classes.board__cell_missed]:
                shots[`${i}${COORDINATES_SEPARATOR}${j}`] === CellStatus.Missed,
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
