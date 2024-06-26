import { GetShotgunRating } from '../Components/DepthChart/DepthChartHelper';
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Throw Power',
                    Value: data.ThrowPower,
                    Letter: GetLetterGrade(
                        AttributeAverages['ThrowPower'][data.Position],
                        data.ThrowPower,
                        data.Year
                    )
                },
                {
                    Name: 'Throw Accuracy',
                    Value: data.ThrowAccuracy,
                    Letter: GetLetterGrade(
                        AttributeAverages['ThrowAccuracy'][data.Position],
                        data.ThrowAccuracy,
                        data.Year
                    )
                },
                {
                    Name: 'Shotgun Rating',
                    Value: GetShotgunRating(data.Shotgun),
                    Letter: GetShotgunRating(data.Shotgun)
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying,
                        data.Year
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching,
                        data.Year
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying,
                        data.Year
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching,
                        data.Year
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock,
                        data.Year
                    )
                },
                {
                    Name: 'Run Block',
                    Value: data.RunBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunBlock'][data.Position],
                        data.RunBlock,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying,
                        data.Year
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching,
                        data.Year
                    )
                },
                {
                    Name: 'Route Running',
                    Value: data.RouteRunning,
                    Letter: GetLetterGrade(
                        AttributeAverages['RouteRunning'][data.Position],
                        data.RouteRunning,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Carrying',
                    Value: data.Carrying,
                    Letter: GetLetterGrade(
                        AttributeAverages['Carrying'][data.Position],
                        data.Carrying,
                        data.Year
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching,
                        data.Year
                    )
                },
                {
                    Name: 'Route Running',
                    Value: data.RouteRunning,
                    Letter: GetLetterGrade(
                        AttributeAverages['RouteRunning'][data.Position],
                        data.RouteRunning,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock,
                        data.Year
                    )
                },
                {
                    Name: 'Run Block',
                    Value: data.RunBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunBlock'][data.Position],
                        data.RunBlock,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: data.PassBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassBlock'][data.Position],
                        data.PassBlock,
                        data.Year
                    )
                },
                {
                    Name: 'Run Block',
                    Value: data.RunBlock,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunBlock'][data.Position],
                        data.RunBlock,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: data.PassRush,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassRush'][data.Position],
                        data.PassRush,
                        data.Year
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: data.PassRush,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassRush'][data.Position],
                        data.PassRush,
                        data.Year
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: data.PassRush,
                    Letter: GetLetterGrade(
                        AttributeAverages['PassRush'][data.Position],
                        data.PassRush,
                        data.Year
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense,
                        data.Year
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: data.ZoneCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ZoneCoverage'][data.Position],
                        data.ZoneCoverage,
                        data.Year
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: data.ManCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ManCoverage'][data.Position],
                        data.ManCoverage,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: data.ZoneCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ZoneCoverage'][data.Position],
                        data.ZoneCoverage,
                        data.Year
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: data.ManCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ManCoverage'][data.Position],
                        data.ManCoverage,
                        data.Year
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching,
                        data.Year
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
                        data.Agility,
                        data.Year
                    )
                },
                {
                    Name: 'Speed',
                    Value: data.Speed,
                    Letter: GetLetterGrade(
                        AttributeAverages['Speed'][data.Position],
                        data.Speed,
                        data.Year
                    )
                },
                {
                    Name: 'Tackle',
                    Value: data.Tackle,
                    Letter: GetLetterGrade(
                        AttributeAverages['Tackle'][data.Position],
                        data.Tackle,
                        data.Year
                    )
                },
                {
                    Name: 'Strength',
                    Value: data.Strength,
                    Letter: GetLetterGrade(
                        AttributeAverages['Strength'][data.Position],
                        data.Strength,
                        data.Year
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: data.RunDefense,
                    Letter: GetLetterGrade(
                        AttributeAverages['RunDefense'][data.Position],
                        data.RunDefense,
                        data.Year
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: data.ZoneCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ZoneCoverage'][data.Position],
                        data.ZoneCoverage,
                        data.Year
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: data.ManCoverage,
                    Letter: GetLetterGrade(
                        AttributeAverages['ManCoverage'][data.Position],
                        data.ManCoverage,
                        data.Year
                    )
                },
                {
                    Name: 'Catching',
                    Value: data.Catching,
                    Letter: GetLetterGrade(
                        AttributeAverages['Catching'][data.Position],
                        data.Catching,
                        data.Year
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
                        data.KickAccuracy,
                        data.Year
                    )
                },
                {
                    Name: 'Kick Power',
                    Value: data.KickPower,
                    Letter: GetLetterGrade(
                        AttributeAverages['KickPower'][data.Position],
                        data.KickPower,
                        data.Year
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
                        data.PuntAccuracy,
                        data.Year
                    )
                },
                {
                    Name: 'Punt Power',
                    Value: data.PuntPower,
                    Letter: GetLetterGrade(
                        AttributeAverages['PuntPower'][data.Position],
                        data.PuntPower,
                        data.Year
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
            data.FootballIQ,
            data.Year
        )
    });
    priorityAttributes.push({
        Name: 'Stamina',
        Value: data.Stamina,
        Letter: GetLetterGrade(
            AttributeAverages['Stamina'][data.Position],
            data.Stamina,
            data.Year
        )
    });
    priorityAttributes.push({
        Name: 'Injury',
        Value: data.Injury,
        Letter: GetLetterGrade(
            AttributeAverages['Injury'][data.Position],
            data.Injury,
            data.Year
        )
    });
    priorityAttributes.push({
        Name: 'Potential',
        Letter: data.PotentialGrade
    });

    return priorityAttributes;
};

export const SetNFLPriority = (player) => {
    let hasSnaps = !player.ShowLetterGrade;
    let priorityAttributes = [];
    switch (player.Position) {
        case 'QB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Carrying',
                    Value: player.Carrying,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Carrying'][player.Position],
                        player.Carrying,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Throw Power',
                    Value: player.ThrowPower,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ThrowPower'][player.Position],
                        player.ThrowPower,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Throw Accuracy',
                    Value: player.ThrowAccuracy,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ThrowAccuracy'][player.Position],
                        player.ThrowAccuracy,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Shotgun Rating',
                    Value: GetShotgunRating(player.Shotgun),
                    Letter: GetShotgunRating(player.Shotgun)
                }
            ];
            break;
        case 'RB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Carrying',
                    Value: player.Carrying,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Carrying'][player.Position],
                        player.Carrying,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Catching',
                    Value: player.Catching,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Catching'][player.Position],
                        player.Catching,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: player.PassBlock,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PassBlock'][player.Position],
                        player.PassBlock,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'FB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Carrying',
                    Value: player.Carrying,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Carrying'][player.Position],
                        player.Carrying,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Catching',
                    Value: player.Catching,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Catching'][player.Position],
                        player.Catching,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: player.PassBlock,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PassBlock'][player.Position],
                        player.PassBlock,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Run Block',
                    Value: player.RunBlock,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RunBlock'][player.Position],
                        player.RunBlock,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'WR':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Carrying',
                    Value: player.Carrying,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Carrying'][player.Position],
                        player.Carrying,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Catching',
                    Value: player.Catching,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Catching'][player.Position],
                        player.Catching,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Route Running',
                    Value: player.RouteRunning,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RouteRunning'][player.Position],
                        player.RouteRunning,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'TE':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Carrying',
                    Value: player.Carrying,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Carrying'][player.Position],
                        player.Carrying,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Catching',
                    Value: player.Catching,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Catching'][player.Position],
                        player.Catching,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Route Running',
                    Value: player.RouteRunning,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RouteRunning'][player.Position],
                        player.RouteRunning,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: player.PassBlock,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PassBlock'][player.Position],
                        player.PassBlock,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Run Block',
                    Value: player.RunBlock,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RunBlock'][player.Position],
                        player.RunBlock,
                        player.Experience,
                        hasSnaps
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
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Pass Block',
                    Value: player.PassBlock,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PassBlock'][player.Position],
                        player.PassBlock,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Run Block',
                    Value: player.RunBlock,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RunBlock'][player.Position],
                        player.RunBlock,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'DE':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Tackle',
                    Value: player.Tackle,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Tackle'][player.Position],
                        player.Tackle,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: player.PassRush,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PassRush'][player.Position],
                        player.PassRush,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: player.RunDefense,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RunDefense'][player.Position],
                        player.RunDefense,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'DT':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Tackle',
                    Value: player.Tackle,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Tackle'][player.Position],
                        player.Tackle,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: player.PassRush,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PassRush'][player.Position],
                        player.PassRush,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: player.RunDefense,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RunDefense'][player.Position],
                        player.RunDefense,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'ILB':
        case 'OLB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Tackle',
                    Value: player.Tackle,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Tackle'][player.Position],
                        player.Tackle,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Pass Rush',
                    Value: player.PassRush,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PassRush'][player.Position],
                        player.PassRush,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: player.RunDefense,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RunDefense'][player.Position],
                        player.RunDefense,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: player.ZoneCoverage,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ZoneCoverage'][player.Position],
                        player.ZoneCoverage,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: player.ManCoverage,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ManCoverage'][player.Position],
                        player.ManCoverage,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'CB':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Tackle',
                    Value: player.Tackle,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Tackle'][player.Position],
                        player.Tackle,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: player.ZoneCoverage,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ZoneCoverage'][player.Position],
                        player.ZoneCoverage,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: player.ManCoverage,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ManCoverage'][player.Position],
                        player.ManCoverage,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Catching',
                    Value: player.Catching,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Catching'][player.Position],
                        player.Catching,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'FS':
        case 'SS':
            priorityAttributes = [
                {
                    Name: 'Agility',
                    Value: player.Agility,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Agility'][player.Position],
                        player.Agility,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Speed',
                    Value: player.Speed,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Speed'][player.Position],
                        player.Speed,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Tackle',
                    Value: player.Tackle,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Tackle'][player.Position],
                        player.Tackle,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Strength',
                    Value: player.Strength,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Strength'][player.Position],
                        player.Strength,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Run Defense',
                    Value: player.RunDefense,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['RunDefense'][player.Position],
                        player.RunDefense,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Zone Coverage',
                    Value: player.ZoneCoverage,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ZoneCoverage'][player.Position],
                        player.ZoneCoverage,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Man Coverage',
                    Value: player.ManCoverage,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['ManCoverage'][player.Position],
                        player.ManCoverage,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Catching',
                    Value: player.Catching,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['Catching'][player.Position],
                        player.Catching,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'K':
            priorityAttributes = [
                {
                    Name: 'Kick Accuracy',
                    Value: player.KickAccuracy,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['KickAccuracy'][player.Position],
                        player.KickAccuracy,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Kick Power',
                    Value: player.KickPower,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['KickPower'][player.Position],
                        player.KickPower,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        case 'P':
            priorityAttributes = [
                {
                    Name: 'Punt Accuracy',
                    Value: player.PuntAccuracy,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PuntAccuracy'][player.Position],
                        player.PuntAccuracy,
                        player.Experience,
                        hasSnaps
                    )
                },
                {
                    Name: 'Punt Power',
                    Value: player.PuntPower,
                    Letter: GetNFLLetterGrade(
                        AttributeAverages['PuntPower'][player.Position],
                        player.PuntPower,
                        player.Experience,
                        hasSnaps
                    )
                }
            ];
            break;
        default:
            break;
    }
    priorityAttributes.push({
        Name: 'Football IQ',
        Value: player.FootballIQ,
        Letter: GetNFLLetterGrade(
            AttributeAverages['FootballIQ'][player.Position],
            player.FootballIQ,
            player.Experience,
            hasSnaps
        )
    });
    priorityAttributes.push({
        Name: 'Stamina',
        Value: player.Stamina,
        Letter: GetNFLLetterGrade(
            AttributeAverages['Stamina'][player.Position],
            player.Stamina,
            player.Experience,
            hasSnaps
        )
    });
    priorityAttributes.push({
        Name: 'Injury',
        Value: player.Injury,
        Letter: GetNFLLetterGrade(
            AttributeAverages['Injury'][player.Position],
            player.Injury,
            player.Experience,
            hasSnaps
        )
    });
    priorityAttributes.push({
        Name: 'Potential',
        Letter: player.PotentialGrade
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
        case 'minv':
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
        return 'Grad';
    }
};

export const GetNFLYear = (data) => {
    if (data.Experience < 2) return 'R';
    return Number(data.Experience);
};

export const GetStatsYear = (data, viewType) => {
    const isRedshirt = data.IsRedshirt;
    const year =
        viewType === 'SEASON'
            ? Number(data.SeasonStats.Year)
            : Number(data.Stats.Year);

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
        return 'Grad';
    }
};

export const GetOverall = (ovr, year) => {
    if (typeof ovr === 'string') return ovr;
    if (year < 3) {
        if (ovr > 44) return 'A';
        else if (ovr > 34) return 'B';
        else if (ovr > 24) return 'C';
        else if (ovr > 14) return 'D';
    } else {
        if (ovr > 47) return 'A';
        else if (ovr > 44) return 'A-';
        else if (ovr > 40) return 'B+';
        else if (ovr > 37) return 'B';
        else if (ovr > 34) return 'B-';
        else if (ovr > 30) return 'C+';
        else if (ovr > 27) return 'C';
        else if (ovr > 24) return 'C-';
        else if (ovr > 20) return 'D+';
        else if (ovr > 17) return 'D';
        else if (ovr > 14) return 'D-';
    }
    return 'F';
};

export const GetNFLOverall = (ovr, showLetterGrade) => {
    if (!showLetterGrade) return ovr;
    if (ovr > 61) return 'A';
    else if (ovr > 59) return 'A-';
    else if (ovr > 57) return 'B+';
    else if (ovr > 55) return 'B';
    else if (ovr > 53) return 'B-';
    else if (ovr > 51) return 'C+';
    else if (ovr > 49) return 'C';
    else if (ovr > 47) return 'C-';
    else if (ovr > 45) return 'D+';
    else if (ovr > 43) return 'D';
    else if (ovr > 41) return 'D-';
    return 'F';
};

// Private methods related to Position
export const GetLetterGrade = (attr, value, year) => {
    const y = Number(year);
    if (attr === undefined) return 'F';
    const { mean, stddev } = attr;

    if (y < 3) {
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
    } else {
        let dev = stddev * 2.5;
        if (value > mean + dev) {
            return 'A+';
        }
        dev = stddev * 2;
        if (value > mean + dev) {
            return 'A';
        }
        dev = stddev * 1.75;
        if (value > mean + dev) {
            return 'A-';
        }
        dev = stddev * 1.5;
        if (value > mean + dev) {
            return 'B+';
        }
        dev = stddev * 1;
        if (value > mean + dev) {
            return 'B';
        }
        dev = stddev * 0.75;
        if (value > mean + dev) {
            return 'B-';
        }
        dev = stddev * 0.5;
        if (value > mean + dev) {
            return 'C+';
        }
        if (value > mean) {
            return 'C';
        }
        dev = stddev * -0.5;
        if (value > mean + dev) {
            return 'C-';
        }
        dev = stddev * -0.75;
        if (value > mean + dev) {
            return 'D+';
        }
        dev = stddev * -1;
        if (value > mean + dev) {
            return 'D';
        }
        dev = stddev * -1.5;
        if (value > mean + dev) {
            return 'D-';
        }
    }

    return 'F';
};

export const GetNFLLetterGrade = (attr, value, year, meetsSnapCount) => {
    const y = Number(year);
    if (meetsSnapCount || y > 1) return value;
    if (attr === undefined) return 'F';
    const { mean, stddev } = attr;

    if (y < 3) {
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
    } else {
        let dev = stddev * 2.5;
        if (value > mean + dev) {
            return 'A+';
        }
        dev = stddev * 2;
        if (value > mean + dev) {
            return 'A';
        }
        dev = stddev * 1.75;
        if (value > mean + dev) {
            return 'A-';
        }
        dev = stddev * 1.5;
        if (value > mean + dev) {
            return 'B+';
        }
        dev = stddev * 1;
        if (value > mean + dev) {
            return 'B';
        }
        dev = stddev * 0.75;
        if (value > mean + dev) {
            return 'B-';
        }
        dev = stddev * 0.5;
        if (value > mean + dev) {
            return 'C+';
        }
        if (value > mean) {
            return 'C';
        }
        dev = stddev * -0.5;
        if (value > mean + dev) {
            return 'C-';
        }
        dev = stddev * -0.75;
        if (value > mean + dev) {
            return 'D+';
        }
        dev = stddev * -1;
        if (value > mean + dev) {
            return 'D';
        }
        dev = stddev * -1.5;
        if (value > mean + dev) {
            return 'D-';
        }
    }

    return 'F';
};

export const GetNFLRound = (r) => {
    if (r === 0) return 'UDFA';
    if (r === 1) return '1st';
    if (r === 2) return '2nd';
    if (r === 3) return '3rd';
    if (r === 4) return '4th';
    if (r === 5) return '5th';
    if (r === 6) return '6th';
    if (r === 7) return '7th';
};
