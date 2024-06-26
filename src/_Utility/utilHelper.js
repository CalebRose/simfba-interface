/* 
    I recognize that this is not a fool-proof method that is not 
    cryptographically secure, but because this is only 
    game data, I think it's okay to use this function
    */
export const GenerateUniqueID = () => {
    const length = 32;
    const timestamp = new Date().getTime().toString(36);
    let randomString = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length - timestamp.length; i++) {
        randomString += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return timestamp + randomString;
};

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
};

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

export const PickFromArray = (arr) => {
    return arr[~~(Math.random() * arr.length)];
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

export const TitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
        case 'FreeThrow':
        case 'Finishing':
        case 'Ballwork':
        case 'Rebounding':
        case 'InteriorDefense':
        case 'PerimeterDefense':
        case 'PotentialGrade':
            return true;
        default:
            return false;
    }
};

export const ConductSort = (data, sortVal, isAsc, viewType) => {
    switch (sortVal) {
        case 'PassingYards':
            return data.sort((a, b) => {
                return viewType === 'SEASON'
                    ? (a.SeasonStats.PassingYards -
                          b.SeasonStats.PassingYards) *
                          (isAsc ? 1 : -1)
                    : (a.Stats.PassingYards - b.Stats.PassingYards) *
                          (isAsc ? 1 : -1);
            });
        case 'RushingYards':
            return data.sort((a, b) => {
                return viewType === 'SEASON'
                    ? (a.SeasonStats.RushingYards -
                          b.SeasonStats.RushingYards) *
                          (isAsc ? 1 : -1)
                    : (a.Stats.RushingYards - b.Stats.RushingYards) *
                          (isAsc ? 1 : -1);
            });
        case 'ReceivingYards':
            return data.sort((a, b) =>
                viewType === 'SEASON'
                    ? (a.SeasonStats.ReceivingYards -
                          b.SeasonStats.ReceivingYards) *
                      (isAsc ? 1 : -1)
                    : (a.Stats.ReceivingYards - b.Stats.ReceivingYards) *
                      (isAsc ? 1 : -1)
            );

        default:
            return data.sort((a, b) =>
                viewType === 'SEASON'
                    ? (a.SeasonStats[sortVal] - b.SeasonStats[sortVal]) *
                      (isAsc ? 1 : -1)
                    : (a.Stats[sortVal] - b.Stats[sortVal]) * (isAsc ? 1 : -1)
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

export const GetBBAMinutesRequired = (position, style, isNBA) => {
    if (style === 'Traditional') {
        if (position === 'PG') return isNBA ? 48 : 40;
        else if (position === 'SG') return isNBA ? 48 : 40;
        else if (position === 'SF') return isNBA ? 48 : 40;
        else if (position === 'PF') return isNBA ? 48 : 40;
        else if (position === 'C') return isNBA ? 48 : 40;
    } else if (style === 'Small Ball') {
        if (position === 'PG') return isNBA ? 48 : 40;
        else if (position === 'SG') return isNBA ? 96 : 80;
        else if (position === 'SF') return isNBA ? 48 : 40;
        else if (position === 'PF') return isNBA ? 48 : 40;
        else if (position === 'C') return isNBA ? 0 : 0;
    } else if (style === 'Microball') {
        if (position === 'PG') return isNBA ? 96 : 80;
        else if (position === 'SG') return isNBA ? 96 : 80;
        else if (position === 'SF') return isNBA ? 48 : 40;
        else if (position === 'PF') return isNBA ? 0 : 0;
        else if (position === 'C') return isNBA ? 0 : 0;
    } else {
        // JUMBO
        if (position === 'PG') return isNBA ? 0 : 0;
        else if (position === 'SG') return isNBA ? 48 : 40;
        else if (position === 'SF') return isNBA ? 48 : 40;
        else if (position === 'PF') return isNBA ? 96 : 80;
        else if (position === 'C') return isNBA ? 48 : 40;
    }
};

export const getProportionLimits = (formation, shot, isMin) => {
    if (formation === 'Balanced' || formation === 'Pick-and-Roll')
        return isMin ? 20 : 60;
    else if (formation === 'Motion') {
        if (shot === 'Inside') return isMin ? 10 : 20;
        if (shot === 'Mid') return isMin ? 10 : 20;
        if (shot === 'Three') return isMin ? 30 : 70;
    } else if (formation === 'Post-Up') {
        if (shot === 'Inside') return isMin ? 40 : 80;
        if (shot === 'Mid') return isMin ? 5 : 15;
        if (shot === 'Three') return isMin ? 5 : 15;
    } else if (formation === 'Space-and-Post') {
        if (shot === 'Inside') return isMin ? 10 : 20;
        if (shot === 'Mid') return isMin ? 30 : 70;
        if (shot === 'Three') return isMin ? 30 : 70;
    }
    return 0;
};

export const getCBBPositionList = (pos) => {
    if (pos === 'PG') return ['PG', 'SG'];
    if (pos === 'SG') return ['SG', 'PG', 'SF'];
    if (pos === 'SF') return ['SF', 'SG', 'PF'];
    if (pos === 'PF') return ['PF', 'SF', 'C'];
    return ['C', 'PF'];
};

export const RevealResults = (game, timestamp) => {
    const { TimeSlot, GameComplete } = game;
    if (TimeSlot === 'Thursday Night' && timestamp.ThursdayGames)
        return GameComplete;
    if (TimeSlot === 'Thursday Night Football' && timestamp.NFLThursday)
        return GameComplete;
    if (TimeSlot === 'Friday Night' && timestamp.FridayGames)
        return GameComplete;
    if (TimeSlot === 'Saturday Morning' && timestamp.SaturdayMorning)
        return GameComplete;
    if (TimeSlot === 'Saturday Afternoon' && timestamp.SaturdayNoon)
        return GameComplete;
    if (TimeSlot === 'Saturday Evening' && timestamp.SaturdayEvening)
        return GameComplete;
    if (TimeSlot === 'Saturday Night' && timestamp.SaturdayNight)
        return GameComplete;
    if (TimeSlot === 'Sunday Noon' && timestamp.NFLSundayNoon)
        return GameComplete;
    if (TimeSlot === 'Sunday Afternoon' && timestamp.NFLSundayAfternoon)
        return GameComplete;
    if (TimeSlot === 'Sunday Afternoon' && timestamp.NFLSundayAfternoon)
        return GameComplete;
    if (TimeSlot === 'Sunday Night Football' && timestamp.NFLSundayEvening)
        return GameComplete;
    if (TimeSlot === 'Monday Night Football' && timestamp.NFLMondayEvening)
        return GameComplete;
    return false;
};

export const RevealCBBResults = (game, timestamp) => {
    const { MatchOfWeek, GameComplete } = game;
    if (MatchOfWeek === 'A' && timestamp.GamesARan) return GameComplete;
    if (MatchOfWeek === 'B' && timestamp.GamesBRan) return GameComplete;
    if (MatchOfWeek === 'C' && timestamp.GamesCRan) return GameComplete;
    if (MatchOfWeek === 'D' && timestamp.GamesDRan) return GameComplete;

    return false;
};

export const GetPredictionRound = (r) => {
    if (r === 1) {
        return 'Early First Round';
    } else if (r === 2) {
        return 'Mid First Round';
    } else if (r === 3) {
        return 'Late First Round';
    } else if (r === 4) {
        return 'Early Second Round';
    } else if (r === 5) {
        return 'Mid Second Round';
    } else if (r === 6) {
        return 'Late Second Round';
    } else {
        return 'Likely UDFA';
    }
};

export const inconspicuousLink = 'https://bit.ly/3BlS71b';

export const GenerateNumberFromRange = (min, max) => {
    if (min > max) {
        // Swap min and max if min is greater than max
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const GetCollegeYear = (player) => {
    const isRedshirt = player.IsRedshirt;
    if (player.Year === 5 && isRedshirt) {
        return '(Sr)';
    } else if (player.Year === 4 && !isRedshirt) {
        return 'Sr';
    } else if (player.Year === 4 && isRedshirt) {
        return '(Jr)';
    } else if (player.Year === 3 && !isRedshirt) {
        return 'Jr';
    } else if (player.Year === 3 && isRedshirt) {
        return '(So)';
    } else if (player.Year === 2 && !isRedshirt) {
        return 'So';
    } else if (player.Year === 2 && isRedshirt) {
        return '(Fr)';
    }
    return 'Fr';
};

export const GetPromiseWeight = (promise, benchmark, position, isCFB) => {
    if (promise.length === 0) {
        return 'Very Low';
    }
    if ((promise === 'Wins' && !isCFB) || promise === 'Minutes') {
        if (benchmark <= 5) return 'Very Low';
        if (benchmark <= 10) return 'Low';
        if (benchmark <= 20) return 'Medium';
        if (benchmark <= 25) return 'High';
        return 'Very High';
    } else if (promise === 'Wins' && isCFB) {
        if (benchmark <= 4) return 'Very Low';
        if (benchmark <= 6) return 'Low';
        if (benchmark <= 8) return 'Medium';
        if (benchmark <= 11) return 'High';
        return 'Very High';
    } else if (promise === 'Snaps') {
        if (position !== 'K' || position !== 'P') {
            if (benchmark <= 5) return 'Low';
            if (benchmark <= 8) return 'Medium';
            if (benchmark <= 10) return 'High';
        } else {
            if (benchmark <= 10) return 'Very Low';
            if (benchmark <= 20) return 'Low';
            if (benchmark <= 30) return 'Medium';
            if (benchmark <= 50) return 'High';
            return 'Very High';
        }
    } else if (promise === 'Home State Game') {
        return 'Medium';
    } else if (promise === 'No Redshirt') {
        return 'Low';
    } else if (promise === 'Not Bad Gameplan Fit') {
        return 'Low';
    } else if (promise === 'Good Gameplan Fit') {
        return 'Medium';
    } else if (promise === 'Conference Championship') {
        return 'High';
    } else if (promise === 'Playoffs' && isCFB) {
        return 'High';
    } else if (promise === 'Playoffs' && !isCFB) {
        return 'Medium';
    } else if (promise === 'Bowl Game') {
        return 'Medium';
    } else if (promise === 'Elite 8') {
        return 'High';
    } else if (promise === 'Final Four') {
        return 'Very High';
    } else if (promise === 'National Championship') {
        return 'Very High';
    }
    return 'Very Low';
};

export const GetPromiseMultiplier = (promiseObj) => {
    if (!promiseObj || promiseObj === undefined || promiseObj.ID === 0)
        return 1;
    const { PromiseWeight } = promiseObj;
    if (PromiseWeight === 'Very Low') return 1.05;
    if (PromiseWeight === 'Low') return 1.1;
    if (PromiseWeight === 'Medium') return 1.3;
    if (PromiseWeight === 'High') return 1.5;
    if (PromiseWeight === 'Very High') return 1.75;
    return 1;
};

export const GetDownStr = (down) => {
    if (down === 0 || down === '0') return down;
    if (down === 1 || down === '1') return '1st';
    if (down === 2 || down === '2') return '2nd';
    if (down === 3 || down === '3') return '3rd';
    if (down === 4 || down === '4') return '4th';
    return '';
};

export const ShuffleList = (list) => {
    const newList = [...list];
    let currentIndex = list.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newList[currentIndex], newList[randomIndex]] = [
            newList[randomIndex],
            newList[currentIndex]
        ];
    }

    return newList;
};

export const GetAdjStaminaByPace = (sta, pace) => {
    let mod = 0;
    if (pace === 'Balanced') return sta;
    else if (pace === 'Fast') mod -= 3;
    else if (pace === 'Very Fast') mod -= 6;
    else if (pace === 'Slow') mod += 3;
    else if (pace === 'Very Slow') mod += 6;
    return sta + mod;
};
