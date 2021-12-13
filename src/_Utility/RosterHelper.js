import AttributeAverages from '../Constants/AttributeAverages';

// Roster Helper -- helper methods related to displaying player data on the roster page
export const SetPriority = (data) => {
    let priorityAttributes = [];
    switch (data.Position) {
        case 'QB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Throw Power',
                    Value: data.ThrowPower,
                    Letter: GetLetterGrade(
                        AttributeAverages['ThrowPower'][data.Position],
                        data.ThrowPower
                    )
                },
                {
                    Name: 'Throw Accuracy',
                    Value: data.ThrowAccuracy,
                    Letter: GetLetterGrade(
                        AttributeAverages['ThrowAccuracy'][data.Position],
                        data.ThrowAccuracy
                    )
                }
            ];
            break;
        case 'RB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                }
            ];
            break;
        case 'FB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock
                    )
                },
                {
                    Name: 'Run Block',
                    Value: data.RunBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunBlock'][data.Position],
                        data.RunBlock
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                }
            ];
            break;
        case 'WR':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching
                    )
                },
                {
                    Name: 'Route Running',
                    Value: data.RouteRunning,
                    Letter: GetLetterGrade(
                        AttributeAverages['RouteRunning'][data.Position],
                        data.RouteRunning
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                }
            ];
            break;
        case 'TE':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching
                    )
                },
                {
                    Name: 'Route Running',
                    Value: data.RouteRunning,
                    Letter: GetLetterGrade(
                        AttributeAverages['RouteRunning'][data.Position],
                        data.RouteRunning
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock
                    )
                },
                {
                    Name: 'Run Block',
                    Value: data.RunBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunBlock'][data.Position],
                        data.RunBlock
                    )
                }
            ];
            break;
        case 'OT':
        case 'OG':
        case 'C':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock
                    )
                },
                {
                    Name: 'Run Block',
                    Value: data.RunBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunBlock'][data.Position],
                        data.RunBlock
                    )
                }
            ];
            break;
        case 'DE':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: data.PassRush,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassRush'][data.Position],
                        data.PassRush
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense
                    )
                }
            ];
            break;
        case 'DT':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: data.PassRush,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassRush'][data.Position],
                        data.PassRush
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense
                    )
                }
            ];
            break;
        case 'ILB':
        case 'OLB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: data.PassRush,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassRush'][data.Position],
                        data.PassRush
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: data.ZoneCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ZoneCoverage'][data.Position],
                        data.ZoneCoverage
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: data.ManCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ManCoverage'][data.Position],
                        data.ManCoverage
                    )
                }
            ];
            break;
        case 'CB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: data.ZoneCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ZoneCoverage'][data.Position],
                        data.ZoneCoverage
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: data.ManCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ManCoverage'][data.Position],
                        data.ManCoverage
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching
                    )
                }
            ];
            break;
        case 'FS':
        case 'SS':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: data.Agility,
                    Letter: GetLetterGrade(
                        AttributeAverages['Agility'][data.Position],
                        data.Agility
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: data.ZoneCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ZoneCoverage'][data.Position],
                        data.ZoneCoverage
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: data.ManCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ManCoverage'][data.Position],
                        data.ManCoverage
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching
                    )
                }
            ];
            break;
        case 'K':
            priorityAttributes = [
                {
                    Name: 'Kick Accuracy',
                    Value: data.KickAccuracy,
                    Letter: GetLetterGrade(
                        AttributeAverages['KickAccuracy'][data.Position],
                        data.KickAccuracy
                    )
                },
                {
                    Name: 'Kick Power',
                    Value: data.KickPower,
                    Letter: GetLetterGrade(
                        AttributeAverages['KickPower'][data.Position],
                        data.KickPower
                    )
                }
            ];
            break;
        case 'P':
            priorityAttributes = [
                {
                    Name: 'Punt Accuracy',
                    Value: data.PuntAccuracy,
                    Letter: GetLetterGrade(
                        AttributeAverages['PuntAccuracy'][data.Position],
                        data.PuntAccuracy
                    )
                },
                {
                    Name: 'Punt Power',
                    Value: data.PuntPower,
                    Letter: GetLetterGrade(
                        AttributeAverages['PuntPower'][data.Position],
                        data.PuntPower
                    )
                }
            ];
            break;
        default:
            break;
    }
    priorityAttributes.push({
        Name: 'Football IQ',
        Value: data.FootballIQ,
        Letter: GetLetterGrade(
            AttributeAverages['FootballIQ'][data.Position],
            data.FootballIQ
        )
    });
    priorityAttributes.push({
        Name: 'Stamina',
        Value: data.Stamina,
        Letter: GetLetterGrade(
            AttributeAverages['Stamina'][data.Position],
            data.Stamina
        )
    });
    priorityAttributes.push({
        Name: 'Potential',
        Letter: data.PotentialGrade
    });

    return priorityAttributes;
};

export const GetDefaultOrder = (newSortValue, sort, isAsc) => {
    // If the newSortValue and sort are both equal, return the opposite of isAsc
    if (newSortValue.toLowerCase() === sort.toLowerCase()) return !isAsc;

    // If they aren't equal, set it default descending by the value
    switch (newSortValue) {
        case 'ovr':
        case 'year':
            return false;

        case 'name':
        case 'pos':
        case 'pot':
        case 'arch':
            return true;
        default:
            return false;
    }
};

export const GetYear = (data) => {
    const isRedshirt = data.IsRedshirt;
    const year = Number(data.Year);

    if (year === 1) {
        return 'Fr';
    } else if (year === 2 && isRedshirt) {
        return '(Fr)';
    } else if (year === 2 && !isRedshirt) {
        return 'So';
    } else if (year === 3 && isRedshirt) {
        return '(So)';
    } else if (year === 3 && !isRedshirt) {
        return 'Jr';
    } else if (year === 4 && isRedshirt) {
        return '(Jr)';
    } else if (year === 4 && !isRedshirt) {
        return 'Sr';
    } else if (year === 5 && isRedshirt) {
        return '(Sr)';
    } else {
        return 'Super Sr';
    }
};

// Private methods related to Position
const GetLetterGrade = (attr, value) => {
    const { mean, stddev } = attr;
    let dev = stddev * 2;
    if (value > mean + dev) {
        return 'A';
    }
    dev = stddev * 1;
    if (value > mean + dev) {
        return 'B';
    }
    if (value > mean) {
        return 'C';
    }
    dev = stddev * -1;
    if (value > mean + dev) {
        return 'D';
    }
    return 'F';
};
