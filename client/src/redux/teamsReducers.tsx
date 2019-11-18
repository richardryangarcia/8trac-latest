import { TeamsActions } from "./typeTeamsActions";
import {
  FETCH_GAMES,
  FETCH_GAMES_SUCCESS,
  FETCH_TEAMS,
  FETCH_TEAMS_FAILURE,
  FETCH_TEAMS_SUCCESS
} from "./constants";

export type Team = {
  id: string;
  school?: string;
  mascot?: string;
  abbreviation?: string;
  color?: string;
  alt_color?: string;
  logos?: string[];
};

export type Game = {
  id: string;
  season?: string;
  week: string;
  season_type?: string;
  start_date?: string;
  neutral_site?: boolean;
  conference_game?: boolean;
  venue_id?: string;
  venue?: string;
  home_team: string;
  home_conference?: string;
  home_points?: string;
  home_line_scores?: string[];
  away_team: string;
  away_conference?: string;
  away_points?: string;
  away_line_scores?: string[];
};

export interface TeamsState {
  teams: Team[];
  isLoading: boolean;
  error: boolean;
  games: Game[];
}

const initialState: TeamsState = {
  teams: [],
  isLoading: false,
  error: false,
  games: []
};

export default (
  state: TeamsState = initialState,
  action: TeamsActions
): TeamsState => {
  switch (action.type) {
    case FETCH_TEAMS: {
      return {
        ...state,
        isLoading: true,
        error: false
      };
    }
    case FETCH_GAMES: {
      return {
        ...state,
        isLoading: true,
        error: false
      };
    }
    case FETCH_GAMES_SUCCESS: {
      return {
        ...state,
        games: [...action.payload],
        isLoading: false,
        error: false
      };
    }
    case FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        teams: [...action.payload],
        isLoading: false,
        error: false
      };
    }
    case FETCH_TEAMS_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
};
