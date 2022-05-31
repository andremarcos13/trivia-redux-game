import { QUESTION_SAVER } from '../actions/gameStart';

const INITIAL_STATE = {
  questions: {},
};

function game(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case QUESTION_SAVER:
    console.log('Start do Reducer', QUESTION_SAVER);
    console.log('Payload:', payload);
    return {
      ...state,
      questions: payload,
    };
  default:
    return state;
  }
}

export default game;
