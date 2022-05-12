import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BOARD_SIZE,
  DELAY_TIMEOUT,
  MAX_ATTEMPTS_TO_INIT,
  SHIPS_ON_BOARD,
} from "../../utils/constants";
import { BoardSize, ShipsConfig } from "../../utils/interfaces";

interface SettingsState {
  boardSize: BoardSize;
  delayTimeout: number;
  maxAttemptsToInit: number;
  shipsOnBoard: ShipsConfig;
}

const initialState: SettingsState = {
  boardSize: BOARD_SIZE,
  delayTimeout: DELAY_TIMEOUT,
  maxAttemptsToInit: MAX_ATTEMPTS_TO_INIT,
  shipsOnBoard: SHIPS_ON_BOARD,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeSettings(state, action: PayloadAction<SettingsState>) {
      state.boardSize = action.payload.boardSize;
      state.delayTimeout = action.payload.delayTimeout;
      state.maxAttemptsToInit = action.payload.maxAttemptsToInit;
      state.shipsOnBoard = action.payload.shipsOnBoard;
    },
  },
});

export default settingsSlice.reducer;
