import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getShipsOnBoard from "../../utils/getShipsOnBoard";
import { ShipsPosition } from "../../utils/interfaces";

interface BoardState {
  ships: ShipsPosition;
  shots: ShipsPosition;
}

const initialState: BoardState = {
  ships: getShipsOnBoard(),
  shots: {},
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    reset(state, action: PayloadAction<ShipsPosition>) {
      state.ships = action.payload;
    },
  },
});

export default boardSlice.reducer;
