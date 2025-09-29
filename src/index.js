import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { Provider } from "react-redux";
import reducers from "./reducers";
import App from "./App";
import "./index.less";

const store = configureStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
