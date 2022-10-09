import { cbbTeamActionTypes } from './cbbTeam.types';

export const setCBBTeam = (cbbTeam) => ({
    type: cbbTeamActionTypes.SET_CBB_TEAM,
    payload: cbbTeam
});
