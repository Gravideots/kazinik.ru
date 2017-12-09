import {combineReducers} from 'redux';

//Page Reducers
import main from '../pages/main/reducer.js';
import sidepanel from '../components/sidePanel/reducer.js'
import event from '../pages/event/reducer.js';
import school from '../pages/school/reducer.js';
import admin from '../pages/admin/reducer.js';
import note from '../pages/note/reducer.js';
import section from '../pages/section/reducer.js';
import guestRoom from '../pages/guestRoom/reducer.js';
import login from '../pages/login/reducer.js';

export default combineReducers({
  main,
  event,
  school,
  note,
  admin,
  section,
  sidepanel,
  guestRoom,
  login
});
