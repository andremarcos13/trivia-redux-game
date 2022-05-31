import { QUESTION_SAVER } from '../actions/gameStart';

const INITIAL_STATE = {
  questions: {},
};

function game(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case QUESTION_SAVER:
    return {
      ...state,
      questions: payload,
    };
  default:
    return state;
  }
}

export default game;
