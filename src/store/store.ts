import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shipsReducer from "./reducers/shipsSlice";

const rootReducer = combineReducers({ shipsReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
