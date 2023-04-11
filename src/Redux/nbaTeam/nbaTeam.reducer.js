import { nbaTeamActionTypes } from './nbaTeam.types';

const INITIAL_STATE = {
    nbaTeam: null
};

const nbaTeamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case nbaTeamActionTypes.SET_NBA_TEAM:
            return {
                ...state,
                nbaTeam: action.payload
            };
        default:
            return state;
    }
};

export default nbaTeamReducer;
