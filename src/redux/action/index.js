export const TOKEN_ID = 'TOKEN_ID';
export const getTokenId = (token) => ({
  type: TOKEN_ID,
  payload: token,
});

export const requestTokenId = () => async (dispatch) => {
  const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(tokenEndpoint);
  const data = await response.json();
  dispatch(getTokenId(data.token));
};
