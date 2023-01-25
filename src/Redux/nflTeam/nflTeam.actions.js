import { nflTeamActionTypes } from './nflTeam.types';

export const setNFLTeam = (nflTeam) => ({
    type: nflTeamActionTypes.SET_NFL_TEAM,
    payload: nflTeam
});
