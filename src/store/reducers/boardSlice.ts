import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardShots, ShipsPosition } from "../../utils/interfaces";

interface BoardState {
  run: boolean;
  ships: ShipsPosition;
  shots: BoardShots;
}

const initialState: BoardState = {
  run: false,
  ships: {},
  shots: {},
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initShips(state, action: PayloadAction<ShipsPosition>) {
      state.ships = action.payload;
    },
    runGame(state, action: PayloadAction<boolean>) {
      state.run = action.payload;
    },
    reset(state, action: PayloadAction<ShipsPosition>) {
      state.ships = action.payload;
      state.shots = {};
    },
    makeShot(state, action: PayloadAction<BoardShots>) {
      state.shots = { ...state.shots, ...action.payload };
    },
  },
});

export default boardSlice.reducer;
