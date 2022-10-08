export const PLAYER_INFO = 'PLAYER_INFO';
export const getPlayerInfo = (info) => ({
  type: PLAYER_INFO,
  payload: info,
});

export const requestTokenId = () => async (dispatch) => {
  const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(tokenEndpoint);
  const data = await response.json();
  dispatch(getTokenId(data.token));
};
