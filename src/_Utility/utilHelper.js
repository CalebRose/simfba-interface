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

export const GetDefaultStatsOrder = (newSortValue, sort, isAsc, newView) => {
    // If the newSortValue and sort are both equal, return the opposite of isAsc
    if (newSortValue.toLowerCase() === sort.toLowerCase()) return !isAsc;

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
