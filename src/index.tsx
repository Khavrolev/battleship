import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const store = setupStore();

ReactModal.setAppElement("#root");
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
);
