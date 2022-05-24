import { TOKEN_SAVER } from '../actions/loginAction';

const initialState = {
  token: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case TOKEN_SAVER:
    return {
      ...state,
      token: payload,
    };

  default:
    return state;
  }
};
