import {Map} from 'immutable';

import {TOGGLE_SIDE_BAR, GET_SIDE_BAR_STATUS} from './actions.js';

const initialState = Map({showNav: false});

const actionsMap = {

    [TOGGLE_SIDE_BAR]: (state) => {
        const showNav = state.get('showNav');

        return state.merge(Map({
            showNav: !showNav
        }));
    },

    [GET_SIDE_BAR_STATUS]: (state) => {
        const showNav = state.get('showNav');
        return state.merge(Map({showNav: showNav}));
    }
}

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn
        ? fn(state, action)
        : state;
}