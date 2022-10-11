import { TRIVIA_REQUEST } from '../action';

const initialState = {
  results: [],
  response_code: 0,
};

const questions = (state = initialState, action) => {
  switch (action.type) {
  case TRIVIA_REQUEST:
    return {
      ...state, ...action.payload,
    };
  default:
    return state;
  }
};

export default questions;
