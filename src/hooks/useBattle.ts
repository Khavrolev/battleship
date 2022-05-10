import { boardSlice } from "../store/reducers/boardSlice";
import { DELAY_TIMEOUT } from "../utils/constants";
import { isGameOver } from "../utils/gameStatus";
import getNextShot from "../utils/getNextShot";
import getShipsOnBoard from "../utils/getShipsOnBoard";
import { useAppDispatch, useAppSelector } from "./redux";
import useInterval from "./useInterval";

const useBattle = () => {
  const { runGame, reset, makeShot } = boardSlice.actions;
  const dispatch = useAppDispatch();
  const { run, ships, shots } = useAppSelector((state) => state.boardReducer);

  const handleRunGame = () => {
    dispatch(runGame(!run));
  };

  const handleReset = () => {
    dispatch(reset(getShipsOnBoard()));
  };

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

  return { run, handleRunGame, ships, shots, handleReset };
};

export default useBattle;
