import { createAction } from "typesafe-actions";
import {
  FETCH_TEAMS,
  FETCH_TEAMS_FAILURE,
  FETCH_TEAMS_SUCCESS,
  FETCH_GAMES,
  FETCH_GAMES_SUCCESS
} from "./constants";
import { Team, Game } from "./teamsReducers";

export const fetchTeams = createAction(FETCH_TEAMS);
export const fetchGames = createAction(FETCH_GAMES);
export const fetchTeamsFailure = createAction(
  FETCH_TEAMS_FAILURE,
  resolve => (error: Error) => resolve(error)
);
export const fetchTeamsSuccess = createAction(
  FETCH_TEAMS_SUCCESS,
  resolve => (teamResponse: Team[]) => resolve(teamResponse)
);

export const fetchGamesSuccess = createAction(
  FETCH_GAMES_SUCCESS,
  resolve => (gameResponse: Game[]) => resolve(gameResponse)
);
