import { nbaTeamActionTypes } from './nbaTeam.types';

export const setNBATeam = (nbaTeam) => ({
    type: nbaTeamActionTypes.SET_NBA_TEAM,
    payload: nbaTeam
});
