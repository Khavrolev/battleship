import { useState } from "react";
import { DELAY_TIMEOUT } from "../utils/constants";
import { isGameOver } from "../utils/gameStatus";
import getNextShot from "../utils/getNextShot";
import getShipsOnBoard from "../utils/getShipsOnBoard";
import { BoardState, ShipsPosition } from "../utils/interfaces";
import useInterval from "./useInterval";

const useBattle = () => {
  const [run, setRun] = useState(false);
  const [ships, setShips] = useState<ShipsPosition>(() => getShipsOnBoard());
  const [shots, setShots] = useState<BoardState>({});

  useInterval(
    () => {
      if (isGameOver(ships, shots)) {
        setRun(false);
      } else {
        setShots(getNextShot(ships, shots));
      }
    },
    run ? DELAY_TIMEOUT : null,
  );

  return { run, setRun, ships, setShips, shots, setShots };
};

export default useBattle;
