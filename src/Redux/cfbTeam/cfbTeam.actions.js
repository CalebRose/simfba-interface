import { cfbTeamActionTypes } from './cfbTeam.types';

export const setCFBTeam = (cfbTeam) => ({
    type: cfbTeamActionTypes.SET_CFB_TEAM,
    payload: cfbTeam
});
