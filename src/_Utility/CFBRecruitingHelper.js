import { LowerCaseCheck } from './utilHelper';
import StateMatcher from './stateMatcher.json';
import RegionMatcher from './regionMatcher.json';

export const ValidateAffinity = (CrootAffinity, TeamRecruitingProfile) => {
    const TeamAffinityList = TeamRecruitingProfile.Affinities;

    for (let i = 0; i < TeamAffinityList.length; i++) {
        const affin = TeamAffinityList[i];
        if (
            LowerCaseCheck(CrootAffinity, affin.AffinityName) &
            affin.IsApplicable
        ) {
            return true;
        }
    }

    return false;
};

export const ValidateCloseToHome = (croot, abbr) => {
    // Get State
    // If State IS NOT CA, TX, OR FL, use json list
    // and check if cfbTeam's state is included in list
    // if yes, return true
    // else, return false
    // If State IS CA, TX, or FL, use special region map
    let crootState = croot.State;

    if (crootState === 'TX' || crootState === 'CA' || crootState === 'FL') {
        let regionalState = RegionMatcher[croot.State];
        if (regionalState && !regionalState[croot.City]) {
            // Short term fix if a city isn't on the map
            crootState = `${croot.State}(S)`;
        } else {
            crootState = RegionMatcher[croot.State][croot.City];
        }
    }

    const closeToHomeSchools = StateMatcher[crootState];

    if (closeToHomeSchools.length <= 0) {
        return false;
    }

    return closeToHomeSchools.includes(abbr);
};

export const CalculateAdjustedPoints = (recruitProfile) => {
    let am1 = recruitProfile.AffinityOneEligible;
    let am2 = recruitProfile.AffinityTwoEligible;
    let res = recruitProfile.RecruitingEfficiencyScore;
    let points = recruitProfile.CurrentWeeksPoints;

    if (am1) {
        res = res + 0.1;
    }
    if (am2) {
        res = res + 0.1;
    }

    return Math.round(points * res * 100) / 100;
};
