import { useCallback } from "react";
import { boardSlice } from "../store/reducers/boardSlice";
import { DELAY_TIMEOUT } from "../utils/constants";
import { isGameOver } from "../utils/gameStatus";
import getNextShot from "../utils/getNextShot";
import { useAppDispatch, useAppSelector } from "./redux";
import useInterval from "./useInterval";

const useBattle = () => {
  const dispatch = useAppDispatch();
  const { runGame, makeShot } = boardSlice.actions;
  const { run, ships, shots } = useAppSelector((state) => state.boardReducer);

  const handleRunGame = useCallback(() => {
    dispatch(runGame(!run));
  }, [dispatch, run, runGame]);

  useInterval(
    () => {
      if (isGameOver(ships, shots)) {
        handleRunGame();
      } else {
        dispatch(makeShot(getNextShot(ships, shots)));
      }
    },
    run ? DELAY_TIMEOUT : null,
  );

  return { run, handleRunGame, ships, shots };
};

export default useBattle;
