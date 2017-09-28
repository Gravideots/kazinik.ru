import { combineReducers } from 'redux';

//Page Reducers
import main from '../pages/main/reducer.js';
import sidepanel from '../components/navbar/reducer.js'

export default combineReducers({
  main,
  sidepanel
});
