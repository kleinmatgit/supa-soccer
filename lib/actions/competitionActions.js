import MatchApi from 'api/mockApi';
import * as types from 'actions/actionTypes';
import DisplayMode from 'constants/displayMode';

export function setDisplayMode(displayMode) {
  return {type: types.SET_DISPLAY_MODE, displayMode};
}

export function updateMatchday(matchday) {
  return {type: types.UPDATE_MATCHDAY, matchday};
}

/* COMPETITIONS */
export function begingLoadCompetition() {
  return {type: types.BEGIN_LOAD_COMPETITION};
}

export function loadCompetition(competition) {
  return function(dispatch, getState) {
    dispatch(begingLoadCompetition());
    return MatchApi.getCompetition(competition).then(competition => {
      dispatch(loadCompetitionSuccess(competition));
      switch(getState().competition.displayMode)
      {
      case DisplayMode.MATCHES:
        dispatch(loadMatches());
        break;
      case DisplayMode.STANDINGS:
        dispatch(loadStandings());
        break;
      default:
        dispatch(loadTeams());
        break;
      }
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadCompetitionSuccess(competition) {
  return {type: types.LOAD_COMPETITION_SUCCESS, competition};
}

/* MATCHES */
export function begingLoadMatches() {
  return {type: types.BEGIN_LOAD_MATCHES};
}

export function loadMatches() {
  return function(dispatch, getState) {
    dispatch(begingLoadMatches());
    return MatchApi.getCompetitionMatches(getState().competition.name, getState().competition.matchday).then(matches => {
      dispatch(loadMatchesSuccess(matches));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadMatchesSuccess(matches) {
  return {type: types.LOAD_MATCHES_SUCCESS, matches};
}

/* STANDINGS */
export function begingLoadStandings() {
  return {type: types.BEGIN_LOAD_STANDINGS};
}

export function loadStandings() {
  return function(dispatch, getState) {
    dispatch(begingLoadStandings());
    return MatchApi.getCompetitionStandings(getState().competition.name).then(standings => {
      dispatch(loadStandingsSuccess(standings));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadStandingsSuccess(standings) {
  return {type: types.LOAD_STANDINGS_SUCCESS, standings};
}

/* TEAMS */
export function begingLoadTeams() {
  return {type: types.BEGIN_LOAD_TEAMS};
}

export function loadTeams() {
  return function(dispatch, getState) {
    dispatch(begingLoadTeams());
    return MatchApi.getCompetitionTeams(getState().competition.name).then(teams => {
      dispatch(loadTeamsSuccess(teams));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadTeamsSuccess(teams) {
  return {type: types.LOAD_TEAMS_SUCCESS, teams};
}