import classNames from "classnames";
import classes from "./App.module.css";
import Board from "./components/board/Board";
import useBattle from "./hooks/useBattle";
import {
  isGameCannotBeStarted,
  isGameNotStarted,
  isGameOver,
} from "./utils/gameStatus";
import getShipsOnBoard from "./utils/getShipsOnBoard";

const App = () => {
  const { run, setRun, ships, setShips, shots, setShots } = useBattle();

  const gameCannotBeStarted = isGameCannotBeStarted(ships);
  const gameNotStarted = isGameNotStarted(shots);
  const gameOver = isGameOver(ships, shots);

  const getTitle = () => {
    if (gameCannotBeStarted) {
      return "Game cannot be started with this size of board and ships quantity";
    }

    return `Shot #${Object.keys(shots).length} ${gameOver ? "Game Over!" : ""}`;
  };

  const handleReset = () => {
    setShots({});
    setShips(() => getShipsOnBoard());
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__header}>
        <h1 className={classes.header}>Battleship</h1>
      </div>
      <div className={classes.wrapper__buttons}>
        <button
          className={classes.button}
          onClick={() => setRun(!run)}
          disabled={gameOver}
        >
          {run ? "Stop" : "Start"}
        </button>
        <button
          className={classes.button}
          onClick={handleReset}
          disabled={!gameNotStarted && !gameOver}
        >
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
        <Board ships={ships} shots={shots} />
      </div>
    </div>
  );
};

export default App;
