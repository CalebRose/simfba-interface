import { inboxActionTypes } from './inbox.types';

export const setCFBNotifications = (data) => ({
    type: inboxActionTypes.SET_CFB_NOTIFICATIONS,
    payload: data
});

export const setNFLNotifications = (data) => ({
    type: inboxActionTypes.SET_NFL_NOTIFICATIONS,
    payload: data
});

export const setCBBNotifications = (data) => ({
    type: inboxActionTypes.SET_CBB_NOTIFICATIONS,
    payload: data
});

export const setNBANotifications = (data) => ({
    type: inboxActionTypes.SET_NBA_NOTIFICATIONS,
    payload: data
});
