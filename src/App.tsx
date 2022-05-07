import classNames from "classnames";
import classes from "./App.module.css";
import Board from "./components/board/Board";
import useBattle from "./hooks/useBattle";

const App = () => {
  const { run, setRun, ships, shots, setShots, isGameOver } = useBattle();

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__header}>
        <h1 className={classes.header}>Battleship</h1>
      </div>
      <div className={classes.wrapper__buttons}>
        <button
          className={classes.button}
          onClick={() => setRun(!run)}
          disabled={isGameOver()}
        >
          {run ? "Stop" : "Start"}
        </button>
        <button
          className={classes.button}
          onClick={() => setShots({})}
          disabled={!isGameOver()}
        >
          Reset
        </button>
      </div>
      <div className={classes.wrapper__counter}>
        <div
          className={classNames(classes.counter, {
            [classes.counter_gameover]: isGameOver(),
          })}
        >{`Shot #${Object.keys(shots).length} ${
          isGameOver() ? "Game Over!" : ""
        }`}</div>
      </div>
      <div className={classes.wrapper__board}>
        <Board ships={ships} shots={shots} />
      </div>
    </div>
  );
};

export default App;
