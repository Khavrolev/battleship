import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardSlice";
import settingsReducer from "./reducers/settingsSlice";

const rootReducer = combineReducers({ boardReducer, settingsReducer });

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
