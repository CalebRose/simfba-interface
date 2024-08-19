import { inboxActionTypes } from './inbox.types';

const INITIAL_STATE = {
    cfbNotifications: [],
    nflNotifications: [],
    cbbNotifications: [],
    nbaNotifications: []
};

const inboxReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case inboxActionTypes.SET_CFB_NOTIFICATIONS:
            return {
                ...state,
                cfbNotifications: action.payload
            };
        case inboxActionTypes.SET_NFL_NOTIFICATIONS:
            return {
                ...state,
                nflNotifications: action.payload
            };
        case inboxActionTypes.SET_CBB_NOTIFICATIONS:
            return {
                ...state,
                cbbNotifications: action.payload
            };
        case inboxActionTypes.SET_NBA_NOTIFICATIONS:
            return {
                ...state,
                nbaNotifications: action.payload
            };
        default:
            return state;
    }
};

export default inboxReducer;
