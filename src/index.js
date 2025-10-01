import React from "react";
import { createRoot } from 'react-dom/client';
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { Provider } from "react-redux";
import reducers from "./reducers";
import App from "./App";
import "./index.less";

const store = configureStore(
  { reducer: reducers },
  composeWithDevTools(applyMiddleware(thunk))
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
