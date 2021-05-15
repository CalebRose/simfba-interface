import { TimestampActionTypes } from './timestamp.types';

const INITIAL_STATE = {
    cfb_Timestamp: null,
    cbb_Timestamp: null
};

const timestampReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TimestampActionTypes.SET_CFB_TIMESTAMP:
            return {
                ...state,
                cfb_Timestamp: action.payload
            };
        case TimestampActionTypes.SET_CBB_TIMESTAMP:
            return {
                ...state,
                cbb_Timestamp: action.payload
            };
        default:
            return state;
    }
};

export default timestampReducer;
