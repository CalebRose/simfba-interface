// STATE OBJECT -- the initial or last state

import { ViewModeActionTypes } from './viewMode.types';

// Receives Actions
const INITIAL_STATE = {
    viewMode: localStorage.getItem('theme') || 'dark'
};

const viewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ViewModeActionTypes.SET_VIEW_MODE:
            return {
                ...state,
                viewMode: action.payload
            };
        default:
            return state;
    }
};

export default viewReducer;
