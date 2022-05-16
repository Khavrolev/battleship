import { defaultSettings, LOCAL_STORAGE_NAME } from "./constants";
import { SettingsState } from "./interfaces";

export const getFromLocalStorage = (): SettingsState => {
  const settings = localStorage.getItem(LOCAL_STORAGE_NAME);

  if (!settings) {
    return defaultSettings;
  }

  return JSON.parse(settings);
};

export const setToLocalStorage = (settings: SettingsState) => {
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(settings));
};
