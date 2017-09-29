import {combineReducers} from 'redux';

//Page Reducers
import main from '../pages/main/reducer.js';
import sidepanel from '../components/sidePanel/reducer.js'
import event from '../pages/event/reducer.js';
import school from '../pages/school/reducer.js';

export default combineReducers({main, event, school, sidepanel});
