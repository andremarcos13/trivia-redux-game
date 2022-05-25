import { combineReducers } from 'redux';
import login from './Login';
// import wallet from './wallet';

const rootReducer = combineReducers({
  login,
});

export default rootReducer;
