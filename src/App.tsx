import classNames from "classnames";
import classes from "./App.module.css";
import Board from "./components/board/Board";
import { useAppDispatch } from "./hooks/redux";
import useBattle from "./hooks/useBattle";
import { boardSlice } from "./store/reducers/boardSlice";
import {
  isGameCannotBeStarted,
  // isGameNotStarted,
  isGameOver,
} from "./utils/gameStatus";
import getShipsOnBoard from "./utils/getShipsOnBoard";

const App = () => {
  const { run, handleRunGame, ships, shots } = useBattle();

  const dispatch = useAppDispatch();
  const { reset } = boardSlice.actions;

  const handleReset = () => {
    dispatch(reset(getShipsOnBoard()));
  };

  const gameCannotBeStarted = isGameCannotBeStarted(ships);
  // const gameNotStarted = isGameNotStarted(shots);
  const gameOver = isGameOver(ships, shots);

  const getTitle = () => {
    if (gameCannotBeStarted) {
      return "Game cannot be started with this size of board and amount of ships";
    }

    return `Shot #${Object.keys(shots).length} ${gameOver ? "Game Over!" : ""}`;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__header}>
        <h1 className={classes.header}>Battleship</h1>
      </div>
      <div className={classes.wrapper__buttons}>
        <button
          className={classes.button}
          onClick={handleRunGame}
          disabled={gameOver}
        >
          {run ? "Stop" : "Start"}
        </button>
        <button className={classes.button} onClick={handleReset} disabled={run}>
          Reset
        </button>
      </div>
      <div className={classes.wrapper__counter}>
        <div
          className={classNames(classes.counter, {
            [classes.counter_gameover]: gameOver,
          })}
        >
          {getTitle()}
        </div>
      </div>
      <div className={classes.wrapper__board}>
        <Board />
      </div>
    </div>
  );
};

export default App;
