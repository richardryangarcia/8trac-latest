import { ActionType } from "typesafe-actions";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import * as teamsActions from "./teamsActions";
import teamsReducer, { TeamsState } from "./teamsReducers";
import teamsSagas from "./teamsSagas";
import { all } from "redux-saga/effects";
import { drizzleOptions } from "../configs/drizzle";
import { Drizzle, generateStore } from "drizzle";

// export type TeamsActions = ActionType<typeof teamsActions>;

// export type RootState = {
//   teams: TeamsState;
// };

//actions
export const rootActions = {
  ...teamsActions
};

//reducers
export const appReducers = combineReducers({
  teams: teamsReducer
});

//sagas
export function* rootSaga() {
  yield all([teamsSagas()]);
}

const sagaMiddleware = createSagaMiddleware();
export const appMiddlewares = [sagaMiddleware];
export const appSagas = [rootSaga];

const drizzleStore = generateStore({
  drizzleOptions,
  appReducers,
  appSagas,
  appMiddlewares
});
console.log(drizzleStore);

const setUpStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const appMiddlewares = [sagaMiddleware];
  const appSagas = [rootSaga];
  const drizzleStore = generateStore({
    drizzleOptions,
    appReducers,
    appSagas,
    appMiddlewares
  });

  const drizzle = new Drizzle(drizzleOptions, drizzleStore);
  sagaMiddleware.run(rootSaga);
  console.log(drizzle);
  return drizzle;
};
// export const drizzle = new Drizzle(drizzleOptions, drizzleStore);

// sagaMiddleware.run(rootSaga);

export const drizzle = setUpStore();
