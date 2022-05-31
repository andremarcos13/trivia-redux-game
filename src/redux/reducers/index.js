import { combineReducers } from 'redux';
import player from './Login';
import game from './Game';
import tokenSaver from './TokenSaver';

const rootReducer = combineReducers({
  player, game, tokenSaver,
});

export default rootReducer;
