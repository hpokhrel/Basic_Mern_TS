import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Toaster position="bottom-right" />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
