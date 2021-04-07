import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { mytheme } from "./mytheme";
import { Windmill } from "@windmill/react-ui";
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <Windmill theme={mytheme}>
      <App />
    </Windmill>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
