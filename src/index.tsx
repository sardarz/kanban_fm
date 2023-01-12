import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./app/store";
import { Provider } from "react-redux";
import ThemeContextWrapper from "./common/theme/ThemeContextWrapper";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ThemeContextWrapper>
);
