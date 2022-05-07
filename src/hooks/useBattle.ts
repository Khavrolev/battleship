import { useState } from "react";
import { BOARD_SIZE, DELAY_TIMEOUT } from "../utils/constants";
import CellStatus from "../utils/enums";
import getNextShot from "../utils/getNextShot";
import { BoardState, ShipsPosition } from "../utils/interfaces";
import useInterval from "./useInterval";

const useBattle = () => {
  const mockShips = {
    "0-0": true,
    "0-1": true,
    "0-2": true,
    "1-2": true,
    "4-0": true,
    "5-0": true,
    "6-0": true,
    "7-0": true,
    "5-5": true,
    "7-7": true,
  };

  const [run, setRun] = useState(false);
  const [ships] = useState<ShipsPosition>(mockShips);
  const [shots, setShots] = useState<BoardState>({});

  const isNoShot = () =>
    Object.keys(shots).length === BOARD_SIZE.rows * BOARD_SIZE.columns;

  const isShipsSunk = () =>
    Object.keys(ships).length ===
    Object.keys(shots).filter((shot) => shots[shot] === CellStatus.Dead).length;

  const isGameOver = () => isNoShot() || isShipsSunk();

  useInterval(
    () => {
      if (isGameOver()) {
        setRun(false);
      } else {
        setShots(getNextShot(ships, shots));
      }
    },
    run ? DELAY_TIMEOUT : null,
  );

  return { run, setRun, ships, shots, setShots, isGameOver };
};

export default useBattle;
