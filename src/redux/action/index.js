export const PLAYER_INFO = 'PLAYER_INFO';
export const TRIVIA_REQUEST = 'TRIVIA_REQUEST';

export const getPlayerInfo = (info) => ({
  type: PLAYER_INFO,
  payload: info,
});

export const getTriviaData = (info) => ({
  type: TRIVIA_REQUEST,
  payload: info,
});

export const fetchTrivia = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  dispatch(getTriviaData(data));
};
