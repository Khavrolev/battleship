import { useState } from "react";
import { DELAY_TIMEOUT } from "../utils/constants";
import { isGameOver } from "../utils/gameStatus";
import getNextShot from "../utils/getNextShot";
import { BoardState } from "../utils/interfaces";
import { useAppSelector } from "./redux";
import useInterval from "./useInterval";

const useBattle = () => {
  const [run, setRun] = useState(false);
  const { ships } = useAppSelector((state) => state.boardReducer);
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

  return { run, setRun, ships, shots, setShots };
};

export default useBattle;
