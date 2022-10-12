import { PLAYER_INFO, PLAYER_SCORE, GET_ASSERTIONS, RESET_SCORE } from '../action';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case PLAYER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case RESET_SCORE:
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
