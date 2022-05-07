import { useState } from "react";
import classes from "./App.module.css";
import Board from "./components/board/Board";

const App = () => {
  const [run, setRun] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__header}>
        <h1 className={classes.header}>Battleship</h1>
      </div>
      <div className={classes.wrapper__button}>
        <button className={classes.button} onClick={() => setRun(!run)}>
          {run ? "Stop" : "Start"}
        </button>{" "}
      </div>
      <div className={classes.wrapper__board}>
        <Board />
      </div>
    </div>
  );
};

export default App;
