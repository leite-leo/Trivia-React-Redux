export const PLAYER_INFO = 'PLAYER_INFO';
export const PLAYER_SCORE = 'PLAYER_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const RESET_SCORE = 'RESET_SCORE';

export const getPlayerInfo = (info) => ({
  type: PLAYER_INFO,
  payload: info,
});

export const getPlayerScore = (score) => ({
  type: PLAYER_SCORE,
  payload: score,
});

export const getAssertions = () => ({
  type: GET_ASSERTIONS,
});

export const setResetScore = () => ({
  type: RESET_SCORE,
});
