import { SAVE_EMAIL, TOKEN_SAVER } from '../actions/loginAction';

const State = {
  token: '',
  returnToken: {},
  gravatar: {},
};

const login = (state = State, { type, payload, gravatar, profileName, returnToken }) => {
  switch (type) {
  case TOKEN_SAVER:
    return {
      ...state,
      token: payload,
      returnToken,
    };

  case SAVE_EMAIL:
    return {
      ...state,
      gravatar,
      profileName,
    };

  default:
    return state;
  }
};

export default login;
