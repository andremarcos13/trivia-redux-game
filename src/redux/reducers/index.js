import { combineReducers } from 'redux';
import login from './Login';
import game from './Game';
// import wallet from './wallet';

const rootReducer = combineReducers({
  login, game,
});

export default rootReducer;
