import classNames from "classnames";
import { useState } from "react";
import { BOARD_SIZE } from "../../utils/constants";
import CellStatus from "../../utils/enums";
import BoardState from "../../utils/interfaces";
import classes from "./Board.module.css";

const Board = () => {
  const mockState = {
    "0-0": CellStatus.Alive,
    "0-1": CellStatus.Alive,
    "0-2": CellStatus.Alive,
    "1-2": CellStatus.Alive,
    "4-0": CellStatus.Alive,
    "5-0": CellStatus.Alive,
    "6-0": CellStatus.Alive,
    "7-0": CellStatus.Alive,
    "5-5": CellStatus.Alive,
    "7-7": CellStatus.Alive,
  };
  const [state] = useState<BoardState>(mockState);

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
              [classes.cell__missed]: state[`${i}-${j}`] === CellStatus.Missed,
              [classes.cell__alive]: state[`${i}-${j}`] === CellStatus.Alive,
              [classes.cell__dead]: state[`${i}-${j}`] === CellStatus.Dead,
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
