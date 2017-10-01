import { combineReducers } from 'redux';
import main from '../pages/main/reducer.js';
import event from '../pages/event/reducer.js';
import school from '../pages/school/reducer.js';
import note from '../pages/note/reducer.js';

export default combineReducers({
  main,
  event,
  school,
  note,
});
