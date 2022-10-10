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

export const fetchTrivia = (history) => async (dispatch) => {
  const token = localStorage.getItem('token');
  // const token = 'teste';
  console.log(token, 'token');
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  // console.log(history,'history')
  // if (data.response_code === 3) {
  //   localStorage.removeItem('token');
  //   history.push('/');
  //   console.log('entrou no if')
  // }
  dispatch(getTriviaData(data));
};
