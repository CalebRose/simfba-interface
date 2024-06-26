import { LowerCaseCheck } from './utilHelper';
import StateMatcher from './stateMatcher.json';
import RegionMatcher from './regionMatcher.json';
import { FormationMap } from '../Components/Gameplan/GameplanConstants';

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

export const GetRecruitingTendency = (mod) => {
    if (mod === 0.02) return 'Signing Day Decision';
    if (mod > 1.79) {
        return 'Signs Very Early';
    } else if (mod < 1.8 && mod > 1.51) {
        return 'Signs Early';
    } else if (mod < 1.5 && mod > 1.2) {
        return 'Average';
    } else if (mod < 1.21 && mod > 1) {
        return 'Signs Late';
    } else {
        return 'Signs Very Late';
    }
};

export const isGoodFit = (offensiveScheme, defensiveScheme, pos, arch) => {
    if (offensiveScheme.length === 0 || defensiveScheme.length === 0) {
        return false;
    }
    let scheme = offensiveScheme;
    if (
        pos === 'DT' ||
        pos === 'DE' ||
        pos === 'ILB' ||
        pos === 'OLB' ||
        pos === 'CB' ||
        pos === 'FS' ||
        pos === 'SS'
    ) {
        scheme = defensiveScheme;
    }

    const schemeMap = FormationMap[scheme];
    const { SchemeFits } = schemeMap;
    const label = `${arch} ${pos}`;
    const idx = SchemeFits.findIndex((x) => x === label);
    if (idx > -1) {
        return true;
    }
    return false;
};

export const isBadFit = (offensiveScheme, defensiveScheme, pos, arch) => {
    if (offensiveScheme.length === 0 || defensiveScheme.length === 0) {
        return false;
    }
    let scheme = offensiveScheme;
    if (
        pos === 'DT' ||
        pos === 'DE' ||
        pos === 'ILB' ||
        pos === 'OLB' ||
        pos === 'CB' ||
        pos === 'FS' ||
        pos === 'SS'
    ) {
        scheme = defensiveScheme;
    }

    const schemeMap = FormationMap[scheme];
    const { BadFits } = schemeMap;
    const label = `${arch} ${pos}`;
    const idx = BadFits.findIndex((x) => x === label);
    if (idx > -1) {
        return true;
    }
    return false;
};
