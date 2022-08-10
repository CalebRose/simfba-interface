import { TimestampActionTypes } from './timestamp.types';

export const setCFBTimestamp = (ts) => ({
    type: TimestampActionTypes.SET_CFB_TIMESTAMP,
    payload: ts
});

export const setCBBTimestamp = (ts) => ({
    type: TimestampActionTypes.SET_CBB_TIMESTAMP,
    payload: ts
});
