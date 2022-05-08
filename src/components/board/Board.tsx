import classNames from "classnames";
import { FC } from "react";
import { BOARD_SIZE } from "../../utils/constants";
import { CellStatus } from "../../utils/enums";
import { BoardState, ShipsPosition } from "../../utils/interfaces";
import classes from "./Board.module.css";

interface BoardProps {
  ships: ShipsPosition;
  shots: BoardState;
}

const Board: FC<BoardProps> = ({ ships, shots }) => {
  const getBoard = () => {
    const board = [];
    for (let i = 0; i < BOARD_SIZE.rows; i += 1) {
      for (let j = 0; j < BOARD_SIZE.columns; j += 1) {
        board.push(
          <div
            key={`${i}-${j}`}
            style={{
              width: `${BOARD_SIZE.cellSize}px`,
              height: `${BOARD_SIZE.cellSize}px`,
            }}
            className={classNames(classes.board__cell, {
              [classes.cell__alive]: ships[`${i}-${j}`] && !shots[`${i}-${j}`],
              [classes.cell__dead]: shots[`${i}-${j}`] === CellStatus.Dead,
              [classes.cell__missed]: shots[`${i}-${j}`] === CellStatus.Missed,
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
