import { Map } from 'immutable';

import {
    TOGGLE_SIDE_BAR,
} from './actions.js';

const initialState = Map({
    sidebaropen: false,
});

const actionsMap = {

    [TOGGLE_SIDE_BAR]: (state) => {
        const sidebaropen = state.get('sidebaropen');

        return state.merge(Map({
            sidebaropen: !sidebaropen,
        }));
    },
}


export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}