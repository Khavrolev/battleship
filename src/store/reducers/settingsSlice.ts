import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "../../utils/interfaces";
import { getFromLocalStorage } from "../../utils/settings";

const initialState: SettingsState = getFromLocalStorage();

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
