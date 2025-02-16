export const GetOverall = (croot) => {
    if (!croot) return 0;

    if (!croot.Position || !croot.Archetype) return 0;

    switch (croot.Position) {
        case 'QB':
            if (
                !croot.Agility ||
                !croot.ThrowPower ||
                !croot.ThrowAccuracy ||
                !croot.Speed ||
                !croot.FootballIQ ||
                !croot.Strength
            )
                return 0;
            return Math.floor(
                0.1 * croot.Agility +
                    0.25 * croot.ThrowPower +
                    0.25 * croot.ThrowAccuracy +
                    0.1 * croot.Speed +
                    0.2 * croot.FootballIQ +
                    0.1 * croot.Strength
            );
        case 'RB':
            if (
                !croot.Agility ||
                !croot.Carrying ||
                !croot.PassBlock ||
                !croot.Speed ||
                !croot.FootballIQ ||
                !croot.Strength ||
                !croot.Catching
            )
                return 0;
            return Math.floor(
                0.2 * croot.Agility +
                    0.1 * croot.Carrying +
                    0.05 * croot.PassBlock +
                    0.05 * croot.Catching +
                    0.25 * croot.Speed +
                    0.15 * croot.FootballIQ +
                    0.2 * croot.Strength
            );
        case 'FB':
            if (
                !croot.Agility ||
                !croot.Carrying ||
                !croot.PassBlock ||
                !croot.RunBlock ||
                !croot.Speed ||
                !croot.FootballIQ ||
                !croot.Strength ||
                !croot.Catching
            )
                return 0;
            return Math.floor(
                0.1 * croot.Agility +
                    0.1 * croot.Carrying +
                    0.1 * croot.PassBlock +
                    0.25 * croot.RunBlock +
                    0.05 * croot.Catching +
                    0.05 * croot.Speed +
                    0.15 * croot.FootballIQ +
                    0.2 * croot.Strength
            );
        case 'WR':
            if (
                !croot.Agility ||
                !croot.Carrying ||
                !croot.Speed ||
                !croot.FootballIQ ||
                !croot.Strength ||
                !croot.Catching ||
                !croot.RouteRunning
            )
                return 0;
            return Math.floor(
                0.1 * croot.Agility +
                    0.05 * croot.Carrying +
                    0.2 * croot.RouteRunning +
                    0.25 * croot.Catching +
                    0.2 * croot.Speed +
                    0.15 * croot.FootballIQ +
                    0.05 * croot.Strength
            );
        case 'TE':
            if (
                !croot.FootballIQ ||
                !croot.Speed ||
                !croot.Agility ||
                !croot.Carrying ||
                !croot.PassBlock ||
                !croot.RunBlock ||
                !croot.Strength ||
                !croot.Catching ||
                !croot.RouteRunning
            )
                return 0;
            return Math.floor(
                0.15 * croot.FootballIQ +
                    0.1 * croot.Speed +
                    0.1 * croot.Agility +
                    0.05 * croot.Carrying +
                    0.05 * croot.PassBlock +
                    0.15 * croot.RunBlock +
                    0.1 * croot.Strength +
                    0.2 * croot.Catching +
                    0.1 * croot.RouteRunning
            );
        case 'C':
            if (
                !croot.FootballIQ ||
                !croot.Agility ||
                !croot.RunBlock ||
                !croot.Strength ||
                !croot.PassBlock
            )
                return 0;
            return Math.floor(
                0.2 * croot.FootballIQ +
                    0.05 * croot.Agility +
                    0.3 * croot.RunBlock +
                    0.15 * croot.Strength +
                    0.3 * croot.PassBlock
            );
        case 'OG':
        case 'OT':
            if (
                !croot.FootballIQ ||
                !croot.Agility ||
                !croot.RunBlock ||
                !croot.Strength ||
                !croot.PassBlock
            )
                return 0;
            return Math.floor(
                0.15 * croot.FootballIQ +
                    0.05 * croot.Agility +
                    0.3 * croot.RunBlock +
                    0.2 * croot.Strength +
                    0.3 * croot.PassBlock
            );

        case 'DE':
            if (
                !croot.FootballIQ ||
                !croot.Speed ||
                !croot.Strength ||
                !croot.RunDefense ||
                !croot.Agility ||
                !croot.PassRush ||
                !croot.Tackle ||
                !croot.Agility
            )
                return 0;
            return Math.floor(
                0.15 * croot.FootballIQ +
                    0.1 * croot.Speed +
                    0.15 * croot.RunDefense +
                    0.1 * croot.Strength +
                    0.2 * croot.PassRush +
                    0.2 * croot.Tackle +
                    0.1 * croot.Agility
            );
        case 'DT':
            if (
                !croot.FootballIQ ||
                !croot.Agility ||
                !croot.RunDefense ||
                !croot.Strength ||
                !croot.PassRush ||
                !croot.Tackle
            )
                return 0;
            return Math.floor(
                0.15 * croot.FootballIQ +
                    0.05 * croot.Agility +
                    0.2 * croot.Strength +
                    0.25 * croot.RunDefense +
                    0.15 * croot.PassRush +
                    0.2 * croot.Tackle
            );
        case 'OLB':
            if (
                !croot.FootballIQ ||
                !croot.Speed ||
                !croot.RunDefense ||
                !croot.Strength ||
                !croot.PassRush ||
                !croot.Tackle ||
                !croot.ZoneCoverage ||
                !croot.ManCoverage ||
                !croot.Agility
            )
                return 0;
            return Math.floor(
                0.15 * croot.FootballIQ +
                    0.1 * croot.Speed +
                    0.15 * croot.RunDefense +
                    0.1 * croot.Strength +
                    0.15 * croot.PassRush +
                    0.15 * croot.Tackle +
                    0.1 * croot.ZoneCoverage +
                    0.05 * croot.ManCoverage +
                    0.05 * croot.Agility
            );

        case 'ILB':
            if (
                !croot.FootballIQ ||
                !croot.Speed ||
                !croot.RunDefense ||
                !croot.Strength ||
                !croot.PassRush ||
                !croot.Tackle ||
                !croot.ZoneCoverage ||
                !croot.ManCoverage ||
                !croot.Agility
            )
                return 0;
            return Math.floor(
                0.2 * croot.FootballIQ +
                    0.1 * croot.Speed +
                    0.15 * croot.RunDefense +
                    0.1 * croot.Strength +
                    0.1 * croot.PassRush +
                    0.15 * croot.Tackle +
                    0.1 * croot.ZoneCoverage +
                    0.05 * croot.ManCoverage +
                    0.05 * croot.Agility
            );

        case 'CB':
            if (
                !croot.FootballIQ ||
                !croot.Speed ||
                !croot.Tackle ||
                !croot.Strength ||
                !croot.Agility ||
                !croot.ZoneCoverage ||
                !croot.ManCoverage ||
                !croot.Catching
            )
                return 0;
            return Math.floor(
                0.15 * croot.FootballIQ +
                    0.25 * croot.Speed +
                    0.05 * croot.Tackle +
                    0.05 * croot.Strength +
                    0.15 * croot.Agility +
                    0.15 * croot.ZoneCoverage +
                    0.15 * croot.ManCoverage +
                    0.05 * croot.Catching
            );

        case 'FS':
            if (
                !croot.FootballIQ ||
                !croot.Speed ||
                !croot.RunDefense ||
                !croot.Strength ||
                !croot.Catching ||
                !croot.Tackle ||
                !croot.ZoneCoverage ||
                !croot.ManCoverage ||
                !croot.Agility
            )
                return 0;
            return Math.floor(
                0.2 * croot.FootballIQ +
                    0.2 * croot.Speed +
                    0.05 * croot.RunDefense +
                    0.05 * croot.Strength +
                    0.05 * croot.Catching +
                    0.05 * croot.Tackle +
                    0.15 * croot.ZoneCoverage +
                    0.15 * croot.ManCoverage +
                    0.1 * croot.Agility
            );
        case 'SS':
            if (
                !croot.FootballIQ ||
                !croot.Speed ||
                !croot.RunDefense ||
                !croot.Strength ||
                !croot.Catching ||
                !croot.Tackle ||
                !croot.ZoneCoverage ||
                !croot.ManCoverage ||
                !croot.Agility
            )
                return 0;
            return Math.floor(
                0.15 * croot.FootballIQ +
                    0.2 * croot.Speed +
                    0.05 * croot.RunDefense +
                    0.05 * croot.Strength +
                    0.05 * croot.Catching +
                    0.1 * croot.Tackle +
                    0.15 * croot.ZoneCoverage +
                    0.15 * croot.ManCoverage +
                    0.1 * croot.Agility
            );

        case 'K':
            if (!croot.FootballIQ || !croot.KickPower || !croot.KickAccuracy)
                return 0;
            return Math.floor(
                0.1 * croot.FootballIQ +
                    0.45 * croot.KickPower +
                    0.45 * croot.KickAccuracy
            );

        case 'P':
            if (!croot.FootballIQ || !croot.PuntPower || !croot.PuntAccuracy)
                return 0;
            return Math.floor(
                0.1 * croot.FootballIQ +
                    0.45 * croot.PuntPower +
                    0.45 * croot.PuntAccuracy
            );

        default:
            if (
                !croot.FootballIQ ||
                !croot.Strength ||
                !croot.Speed ||
                !croot.Agility ||
                !croot.Catching
            )
                return 0;
            return Math.floor(
                0.2 * croot.FootballIQ +
                    0.2 * croot.Strength +
                    0.2 * croot.Speed +
                    0.2 * croot.Agility +
                    0.2 * croot.Catching
            );
    }
};

export const GenerateAttributes = (croot) => {
    if (!croot) return;

    if (!croot.Position || !croot.Archetype || !croot.Stars) return;

    switch (croot.Position) {
        case 'QB':
            break;

        case 'RB':
            break;

        case 'FB':
            break;

        case 'WR':
            break;

        case 'TE':
            break;

        case 'C':
            break;

        case 'OG':
        case 'OT':
            break;

        case 'DE':
            break;

        case 'DT':
            break;

        case 'OLB':
            break;

        case 'ILB':
            break;

        case 'CB':
            break;

        case 'FS':
            break;

        case 'SS':
            break;

        case 'K':
            break;

        case 'P':
            break;

        default:
            break;
    }
};

export const GetPotentialGrade = (progression) => {
    //
    let adjust = RandomRange(-10, 10);
    if (adjust === 0) {
        const test = RandomRange(-1000, 1001);
        if (test > 0) adjust = adjust + 1;
        else if (test < 0) adjust = adjust - 1;
        else adjust = 0;
    }
    let val = progression + adjust;
    if (val > 80) return 'A+';
    if (val > 70) return 'A';
    if (val > 65) return 'A-';
    if (val > 60) return 'B+';
    if (val > 55) return 'B';
    if (val > 50) return 'B-';
    if (val > 40) return 'C+';
    if (val > 30) return 'C';
    if (val > 25) return 'C-';
    if (val > 200) return 'D+';
    if (val > 15) return 'D';
    if (val > 10) return 'D-';
    return 'F';
};

export const GetValidation = (croot) => {
    if (!croot) return false;

    if (
        croot.FirstName &&
        croot.LastName &&
        croot.Position &&
        croot.Archetype &&
        croot.Height &&
        croot.Weight &&
        croot.Stars &&
        croot.Overall &&
        croot.Stamina &&
        croot.Injury &&
        croot.FootballIQ &&
        croot.Speed &&
        croot.Carrying &&
        croot.Agility &&
        croot.Catching &&
        croot.RouteRunning &&
        croot.ZoneCoverage &&
        croot.ManCoverage &&
        croot.Strength &&
        croot.Tackle &&
        croot.PassBlock &&
        croot.RunBlock &&
        croot.PassRush &&
        croot.RunDefense &&
        croot.ThrowAccuracy &&
        croot.ThrowPower &&
        croot.KickAccuracy &&
        croot.KickPower &&
        croot.PuntAccuracy &&
        croot.PuntPower &&
        croot.Progression &&
        croot.Discipline &&
        croot.FreeAgency &&
        croot.Personality &&
        croot.RecruitingBias &&
        croot.WorkEthic &&
        croot.AcademicBias &&
        croot.Weight
    )
        return true;
    return false;
};

export const GetCBBValidation = (croot) => {
    if (!croot) return false;
    if (
        croot.FirstName &&
        croot.LastName &&
        croot.Position &&
        croot.Height &&
        croot.Country &&
        croot.Stars &&
        croot.Overall &&
        croot.Stamina &&
        croot.Shooting2 &&
        croot.Shooting3 &&
        croot.FreeThrow &&
        croot.Finishing &&
        croot.Ballwork &&
        croot.Rebounding &&
        croot.InteriorDefense &&
        croot.PerimeterDefense &&
        croot.Potential &&
        croot.FreeAgency &&
        croot.Personality &&
        croot.RecruitingBias &&
        croot.WorkEthic &&
        croot.AcademicBias
    )
        return true;
    return false;
};

export const GetCBBOverall = (croot) => {
    return (
        Math.floor((croot.Shooting2 + croot.Shooting3 + croot.FreeThrow) / 3) +
        croot.Finishing +
        croot.Ballwork +
        croot.Rebounding +
        Math.floor((croot.InteriorDefense + croot.PerimeterDefense) / 2)
    );
};

export const GetStarRating = (ovr) => {
    if (ovr > 67) {
        return 5;
    } else if (ovr > 61) {
        return 4;
    } else if (ovr > 52) {
        return 3;
    } else if (ovr > 45) {
        return 2;
    }
    return 1;
};

export const RandomRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
