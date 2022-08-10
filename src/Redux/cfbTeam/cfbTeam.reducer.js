import { cfbTeamActionTypes } from './cfbTeam.types';

const INITIAL_STATE = {
    cfbTeam: null
};

const cfbTeamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cfbTeamActionTypes.SET_CFB_TEAM:
            return {
                ...state,
                cfbTeam: action.payload
            };
        default:
            return state;
    }
};

export default cfbTeamReducer;
