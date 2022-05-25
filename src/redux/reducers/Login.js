import { SAVE_EMAIL, TOKEN_SAVER } from '../actions/loginAction';

const initialState = {
  token: '',
  gravatar: {},
};

export default (state = initialState, { type, payload, gravatar, profileName }) => {
  switch (type) {
  case TOKEN_SAVER:
    return {
      ...state,
      token: payload,
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
