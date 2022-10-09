import { cbbTeamActionTypes } from './cbbTeam.types';

const INITIAL_STATE = {
    cbbTeam: null
};

const cbbTeamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cbbTeamActionTypes.SET_CBB_TEAM:
            return {
                ...state,
                cbbTeam: action.payload
            };
        default:
            return state;
    }
};

export default cbbTeamReducer;
