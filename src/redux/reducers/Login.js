import { SAVE_EMAIL } from '../actions/loginAction';
import { SAVE_SCORE } from '../actions/gameStart';

const State = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = State, {
  type, gravatar, profileName, email, playerScore, assertions }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      gravatar,
      name: profileName,
      gravatarEmail: email,
    };

  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + playerScore,
      assertions: state.assertions + assertions,
    };

  default:
    return state;
  }
};

export default player;
