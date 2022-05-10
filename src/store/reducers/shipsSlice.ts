import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getShipsOnBoard from "../../utils/getShipsOnBoard";
import { ShipsPosition } from "../../utils/interfaces";

interface ShipsState {
  ships: ShipsPosition;
}

const initialState: ShipsState = {
  ships: getShipsOnBoard(),
};

export const shipsSlice = createSlice({
  name: "ships",
  initialState,
  reducers: {
    reset(state, action: PayloadAction<ShipsPosition>) {
      state.ships = action.payload;
    },
  },
});

export default shipsSlice.reducer;
