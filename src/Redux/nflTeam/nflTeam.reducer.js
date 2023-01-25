import { nflTeamActionTypes } from './nflTeam.types';

const INITIAL_STATE = {
    nflTeam: null
};

const nflTeamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case nflTeamActionTypes.SET_NFL_TEAM:
            return {
                ...state,
                nflTeam: action.payload
            };
        default:
            return state;
    }
};

export default nflTeamReducer;
