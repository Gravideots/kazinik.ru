import { combineReducers } from 'redux';
import main from '../pages/main/reducer.js';
import event from '../pages/event/reducer.js';

export default combineReducers({
  main,
  event
});
