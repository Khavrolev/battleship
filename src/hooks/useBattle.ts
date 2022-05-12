import { useCallback, useEffect } from "react";
import { boardSlice } from "../store/reducers/boardSlice";
import { isGameOver } from "../utils/gameStatus";
import getNextShot from "../utils/getNextShot";
import getShipsOnBoard from "../utils/getShipsOnBoard";
import { useAppDispatch, useAppSelector } from "./redux";
import useInterval from "./useInterval";

const useBattle = () => {
  const dispatch = useAppDispatch();
  const { initShips, runGame, makeShot } = boardSlice.actions;
  const { run, ships, shots } = useAppSelector((state) => state.boardReducer);
  const { boardSize, delayTimeout, maxAttemptsToInit, shipsOnBoard } =
    useAppSelector((state) => state.settingsReducer);

  useEffect(() => {
    dispatch(
      initShips(getShipsOnBoard(maxAttemptsToInit, boardSize, shipsOnBoard)),
    );
  }, [boardSize, dispatch, initShips, maxAttemptsToInit, shipsOnBoard]);

  const handleRunGame = useCallback(() => {
    dispatch(runGame(!run));
  }, [dispatch, run, runGame]);

  useInterval(
    () => {
      if (isGameOver(ships, shots, boardSize)) {
        handleRunGame();
      } else {
        const limits = {
          row: { min: 0, max: boardSize.rows - 1 },
          column: { min: 0, max: boardSize.columns - 1 },
        };
        dispatch(makeShot(getNextShot(ships, shots, limits)));
      }
    },
    run ? delayTimeout : null,
  );

  return { run, handleRunGame, ships, shots };
};

export default useBattle;
