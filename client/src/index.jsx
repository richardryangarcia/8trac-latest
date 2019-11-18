import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { App } from "./App";
import { drizzle } from "./configs/drizzle";
import { drizzleReactHooks } from "drizzle-react";
import { createHashHistory } from "history";
const history = createHashHistory();

ReactDOM.render(
  <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
    <Router history={history}>
      <App />
    </Router>
  </drizzleReactHooks.DrizzleProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
