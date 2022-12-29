export const LowerCaseCheck = (stringA, stringB) => {
    return stringA.toLowerCase() === stringB.toLowerCase();
};

export const HeightToFeetAndInches = (height) => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return {
        feet: feet,
        inches: inches
    };
};

export const RoundToTwoDecimals = (num) => {
    return Math.round(num * 100) / 100;
};

export const GetDefaultStatsOrder = (
    newSortValue,
    sort,
    isAsc,
    newView,
    currentView
) => {
    // If the newSortValue and sort are both equal, return the opposite of isAsc
    if (
        newSortValue.toLowerCase() === sort.toLowerCase() &&
        newView === currentView
    )
        return !isAsc;

    // If they aren't equal, set it default descending by the value
    switch (newSortValue) {
        case 'PointsAgainst':
        case 'TotalYardsAllowed':
        case 'RushingYardsAllowed':
        case 'ReceivingYardsAllowed':
        case 'OffensivePenalties':
        case 'DefensivePenalties':
        case 'PassingYardsAllowed':
        case 'PassingInterceptions':
        case 'QBSacks':
        case 'Fumbles':
        case 'SacksAllowed':
        case 'PAPG':
        case 'FGAAPG':
        case 'FGMAPG':
        case 'TPMAPG':
        case 'TPAAPG':
        case 'FTAAPG':
        case 'FTMAPG':
        case 'FGPercentAgainst':
        case 'ThreePointPercentAgainst':
        case 'FTPercentAgainst':
        case 'OffReboundsAllowedPerGame':
        case 'DefReboundsAllowedPerGame':
        case 'ReboundsAllowedPerGame':
        case 'AssistsAllowedPerGame':
        case 'StealsAllowedPerGame':
        case 'BlocksAllowedPerGame':
        case 'TurnoversAllowedPerGame':
            return true;
        default:
            return false;
    }
};

export const GetDefaultOrderForCBBOverview = (newSortValue, sort, isAsc) => {
    if (newSortValue.toLowerCase() === sort.toLowerCase()) return !isAsc;
    switch (newSortValue) {
        case 'Rank':
        case 'Name':
        case 'State':
        case 'Country':
        case 'Shooting2':
        case 'Shooting3':
        case 'Finishing':
        case 'Ballwork':
        case 'Rebounding':
        case 'Defense':
        case 'PotentialGrade':
            return true;
        default:
            return false;
    }
};

export const ConductSort = (data, sortVal, isAsc) => {
    switch (sortVal) {
        case 'PassingYards':
            return data.sort(
                (a, b) =>
                    (a.SeasonStats.PassingYards - b.SeasonStats.PassingYards) *
                    (isAsc ? 1 : -1)
            );
        case 'RushingYards':
            return data.sort(
                (a, b) =>
                    (a.SeasonStats.RushingYards - b.SeasonStats.RushingYards) *
                    (isAsc ? 1 : -1)
            );
        case 'ReceivingYards':
            return data.sort(
                (a, b) =>
                    (a.SeasonStats.ReceivingYards -
                        b.SeasonStats.ReceivingYards) *
                    (isAsc ? 1 : -1)
            );

        default:
            return data.sort(
                (a, b) =>
                    (a.SeasonStats[sortVal] - b.SeasonStats[sortVal]) *
                    (isAsc ? 1 : -1)
            );
    }
};

export const ConductSortForCBBOverview = (data, sortVal, isAsc) => {
    switch (sortVal) {
        case 'Rank':
            return data.sort(
                (a, b) =>
                    (a.TotalRank - b.TotalRank) * (isAsc ? 1 : -1) ||
                    (a.Stars - b.Stars) * (isAsc ? 1 : -1)
            );
        case 'Name':
            return data.sort(
                (a, b) =>
                    a.LastName.localeCompare(b.LastName) * (isAsc ? 1 : -1)
            );
        case 'State':
            return data.sort(
                (a, b) =>
                    a.Country.localeCompare(b.Country) * (isAsc ? 1 : -1) ||
                    a.State.localeCompare(b.State) * (isAsc ? 1 : -1)
            );

        case 'PotentialGrade':
            return data.sort((a, b) => {
                const cmp = (x, y) => (x > y) - (x < y);
                return (
                    cmp(a.PotentialGrade + ',', b.PotentialGrade + ',') *
                    (isAsc ? 1 : -1)
                );
            });

        default:
            return data.sort(
                (a, b) =>
                    a[sortVal].localeCompare(b[sortVal]) * (isAsc ? 1 : -1)
            );
    }
};

export const uniq_fast = (a) => {
    const seen = {};
    const out = [];
    const len = a.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        var item = a[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
};

export const numberWithCommas = (x) => {
    if (!x) return '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
