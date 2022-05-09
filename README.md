# battleship test task

Preferably develop following task in React with TypeScript. Make sure code is posted in github or bitbucket public repo with readme on how to run it.

1. Let’s create an onscreen grid of cells aligned within a square 10 by 10.

2. Then we set up initial battle ships - one L shaped, one I shaped and two dot shaped. Initial battle ships cannot overlap.

3. Start actual game play after any kind of user input which would simulate shots at random positions - any missed shot would indicate already hit area, any shot at any of initial ships would visually indicate that battle ship has sink (change of ship color would be fine enough).

4. Program must be able to tell that all ships have sunk and game is over.

5. Battle ships must not touch one another so there is at least a single cell between them. Any battle ship rotation must be random.
   Each ship must have outline color defining boundaries of a ship.

6. Multi cell battle ships (I && L) must consist of 4 cells, so there is no ambiguity of L shapes that do not look like L and I shapes of more or less than 4 cells.

7. Some tests examples would be a nice bonus but not mandatory

## How to run

```bash
npm install

npm run start
```

- There is src/utils/constants.js, where you can change some parameters before starting game:

  - BOARD_SIZE: numbers of rows and columns and cell size;
  - DELAY_TIMEOUT: time interval between shots in ms;
  - MAX_ATTEMPTS_TO_INIT: max number of attempts to find position of ships on board;
  - SHIPS_ON_BOARD: amount of ships of each type, sizes of long and short sizes of ships. Technically short side can be larger than long size, game will work, but it's not good solution.

- You can use [GitHub Pages](https://khavrolev.github.io/battleship/).
