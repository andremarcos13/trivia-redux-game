import { SAVE_EMAIL } from '../actions/loginAction';

const State = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = State, { type, gravatar, profileName, email }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      gravatar,
      name: profileName,
      gravatarEmail: email,
    };

  default:
    return state;
  }
};

export default player;
