import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./index.css";
import { mytheme } from "./mytheme";
import { Windmill } from "@windmill/react-ui";

import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <Windmill theme={mytheme}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Windmill>
  </Provider>,
  document.getElementById("root")
);
