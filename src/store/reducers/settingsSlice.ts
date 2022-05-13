import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BOARD_SIZE,
  DELAY_TIMEOUT,
  MAX_ATTEMPTS_TO_INIT,
  SHIPS_ON_BOARD,
} from "../../utils/constants";
import { SettingsState } from "../../utils/interfaces";

const initialState: SettingsState = {
  boardSize: BOARD_SIZE,
  shipsOnBoard: SHIPS_ON_BOARD,
  delayTimeout: DELAY_TIMEOUT,
  maxAttemptsToInit: MAX_ATTEMPTS_TO_INIT,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeSettings(state, action: PayloadAction<SettingsState>) {
      state.boardSize = action.payload.boardSize;
      state.shipsOnBoard = action.payload.shipsOnBoard;
      state.delayTimeout = action.payload.delayTimeout;
      state.maxAttemptsToInit = action.payload.maxAttemptsToInit;
    },
  },
});

export default settingsSlice.reducer;
