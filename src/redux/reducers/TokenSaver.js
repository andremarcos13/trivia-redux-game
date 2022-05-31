import { TOKEN_SAVER } from '../actions/loginAction';

const initialState = {};

export default (state = initialState, { type, returnToken }) => {
  switch (type) {
  case TOKEN_SAVER:
    return { ...state, ...returnToken };

  default:
    return state;
  }
};
