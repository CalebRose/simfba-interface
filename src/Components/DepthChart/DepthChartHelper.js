import {
    DLineAttributes,
    FBAttributes,
    GeneralAttributes,
    KickerAttributes,
    LinebackerAttributes,
    OLineAttributes,
    PunterAttributes,
    QBAttributes,
    RBAttributes,
    ReturnerAttributes,
    SecondaryAttributes,
    SpecialTeamUnitAttributes,
    TEAttributes,
    WRAttributes
} from './DepthChartConstants';

export const GetAvailablePlayers = (pos, players) => {
    let availablePlayers = [];
    switch (pos) {
        case 'QB':
            availablePlayers = players.filter((x) => x.Position === 'QB');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'P' ||
                        x.Position === 'K' ||
                        x.Position === 'RB' ||
                        x.Position === 'TE'
                )
            );
            break;
        case 'RB':
            availablePlayers = players.filter((x) => x.Position === 'RB');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'FB' ||
                        x.Position === 'WR' ||
                        x.Position === 'QB'
                )
            );
            break;
        case 'FB':
            availablePlayers = players.filter((x) => x.Position === 'FB');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'RB' ||
                        x.Position === 'TE'
                )
            );
            break;
        case 'WR':
            availablePlayers = players.filter((x) => x.Position === 'WR');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'RB' ||
                        x.Position === 'TE' ||
                        x.Position === 'FB' ||
                        x.Position === 'QB'
                )
            );
            break;
        case 'TE':
            availablePlayers = players.filter((x) => x.Position === 'TE');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'WR' ||
                        x.Position === 'FB' ||
                        x.Position === 'RB' ||
                        x.Position === 'QB'
                )
            );
            break;
        case 'LT':
            availablePlayers = players.filter((x) => x.Position === 'OT');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'OG' ||
                        x.Position === 'C' ||
                        x.Position === 'TE' ||
                        x.Position === 'FB'
                )
            );
            break;
        case 'LG':
            availablePlayers = players.filter((x) => x.Position === 'OG');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'OT' ||
                        x.Position === 'C' ||
                        x.Position === 'TE' ||
                        x.Position === 'FB'
                )
            );
            break;
        case 'C':
            availablePlayers = players.filter((x) => x.Position === 'C');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'OT' ||
                        x.Position === 'OG' ||
                        x.Position === 'TE' ||
                        x.Position === 'FB'
                )
            );
            break;
        case 'RG':
            availablePlayers = players.filter((x) => x.Position === 'OG');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'OT' ||
                        x.Position === 'C' ||
                        x.Position === 'TE' ||
                        x.Position === 'FB'
                )
            );
            break;
        case 'RT':
            availablePlayers = players.filter((x) => x.Position === 'OT');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'OG' ||
                        x.Position === 'C' ||
                        x.Position === 'TE' ||
                        x.Position === 'FB'
                )
            );
            break;
        case 'LE':
            availablePlayers = players.filter((x) => x.Position === 'DE');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'DT' ||
                        x.Position === 'OLB' ||
                        x.Position === 'ILB' ||
                        x.Position === 'SS' ||
                        x.Position === 'FS'
                )
            );
            break;
        case 'DT':
            availablePlayers = players.filter((x) => x.Position === 'DT');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'DE' ||
                        x.Position === 'OLB' ||
                        x.Position === 'ILB'
                )
            );
            break;
        case 'RE':
            availablePlayers = players.filter((x) => x.Position === 'DE');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'DT' ||
                        x.Position === 'OLB' ||
                        x.Position === 'ILB' ||
                        x.Position === 'SS' ||
                        x.Position === 'FS'
                )
            );
            break;
        case 'LOLB':
            availablePlayers = players.filter((x) => x.Position === 'OLB');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'ILB' ||
                        x.Position === 'DE' ||
                        x.Position === 'SS' ||
                        x.Position === 'DT' ||
                        x.Position === 'FS' ||
                        x.Position === 'CB'
                )
            );
            break;
        case 'MLB':
            availablePlayers = players.filter((x) => x.Position === 'ILB');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'OLB' ||
                        x.Position === 'SS' ||
                        x.Position === 'FS' ||
                        x.Position === 'CB' ||
                        x.Position === 'DT' ||
                        x.Position === 'DE'
                )
            );
            break;
        case 'ROLB':
            availablePlayers = players.filter((x) => x.Position === 'OLB');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'ILB' ||
                        x.Position === 'DE' ||
                        x.Position === 'SS' ||
                        x.Position === 'DT' ||
                        x.Position === 'FS' ||
                        x.Position === 'CB'
                )
            );
            break;
        case 'CB':
            availablePlayers = players.filter((x) => x.Position === 'CB');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'FS' ||
                        x.Position === 'SS' ||
                        x.Position === 'OLB' ||
                        x.Position === 'ILB'
                )
            );
            break;
        case 'FS':
            availablePlayers = players.filter((x) => x.Position === 'FS');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'CB' ||
                        x.Position === 'SS' ||
                        x.Position === 'OLB' ||
                        x.Position === 'ILB'
                )
            );
            break;
        case 'SS':
            availablePlayers = players.filter((x) => x.Position === 'SS');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'ATH' ||
                        x.Position === 'FS' ||
                        x.Position === 'CB' ||
                        x.Position === 'OLB' ||
                        x.Position === 'ILB'
                )
            );
            break;
        case 'P':
            availablePlayers = players.filter((x) => x.Position === 'P');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'K' ||
                        x.Position === 'ATH' ||
                        x.Position === 'QB'
                )
            );
            break;
        case 'PR':
            availablePlayers = players.filter(
                (x) =>
                    x.Position === 'RB' ||
                    x.Position === 'WR' ||
                    x.Position === 'ATH' ||
                    x.Position === 'FB' ||
                    x.Position === 'CB' ||
                    x.Position === 'FS'
            );
            availablePlayers = availablePlayers.sort(
                (a, b) => a.Speed - b.Speed
            );
            break;
        case 'K':
            availablePlayers = players.filter((x) => x.Position === 'K');
            availablePlayers = availablePlayers.concat(
                players.filter(
                    (x) =>
                        x.Position === 'P' ||
                        x.Position === 'ATH' ||
                        x.Position === 'QB'
                )
            );
            break;
        case 'KR':
            availablePlayers = players.filter(
                (x) =>
                    x.Position === 'RB' ||
                    x.Position === 'WR' ||
                    x.Position === 'ATH' ||
                    x.Position === 'FB' ||
                    x.Position === 'CB' ||
                    x.Position === 'FS'
            );
            availablePlayers = availablePlayers.sort(
                (a, b) => a.Speed - b.Speed
            );
            break;
        case 'FG':
            availablePlayers = players.filter(
                (x) =>
                    x.Position === 'K' ||
                    x.Position === 'P' ||
                    x.Position === 'ATH' ||
                    x.Position === 'QB'
            );
            break;
        case 'STU':
            availablePlayers = players.filter(
                (x) => x.Position !== 'K' && x.Position !== 'P'
            );
            availablePlayers = availablePlayers.sort(
                (a, b) => a.Strength - b.Strength
            );
            break;
        default:
            break;
    }

    return availablePlayers;
};

export const GetPositionAttributes = (pos) => {
    let attributes = GeneralAttributes;

    switch (pos) {
        case 'QB':
            attributes = attributes.concat(QBAttributes);
            break;
        case 'RB':
            attributes = attributes.concat(RBAttributes);
            break;
        case 'FB':
            attributes = attributes.concat(FBAttributes);
            break;
        case 'WR':
            attributes = attributes.concat(WRAttributes);
            break;
        case 'TE':
            attributes = attributes.concat(TEAttributes);
            break;
        case 'LT':
        case 'LG':
        case 'C':
        case 'RG':
        case 'RT':
            attributes = attributes.concat(OLineAttributes);
            break;
        case 'LE':
        case 'DT':
        case 'RE':
            attributes = attributes.concat(DLineAttributes);
            break;
        case 'LOLB':
        case 'MLB':
        case 'ROLB':
            attributes = attributes.concat(LinebackerAttributes);
            break;
        case 'CB':
        case 'FS':
        case 'SS':
            attributes = attributes.concat(SecondaryAttributes);
            break;
        case 'P':
            attributes = attributes.concat(PunterAttributes);
            break;
        case 'PR':
        case 'KR':
            attributes = attributes.concat(ReturnerAttributes);
            break;
        case 'K':
            attributes = attributes.concat(KickerAttributes);
            break;
        case 'FG':
            break;
        case 'STU':
            attributes = attributes.concat(SpecialTeamUnitAttributes);
            break;
        default:
            break;
    }
    attributes = attributes.concat([
        { attr: 'Injury', label: 'Injury', abbr: 'Inj' },
        { attr: 'PotentialGrade', label: 'Potential Grade', abbr: 'Pot' }
    ]);
    return attributes;
};

export const GetPosition = (pos, individualPlayerPosition) => {
    switch (pos) {
        case 'LT':
        case 'RT':
            return 'OT';

        case 'LG':
        case 'RG':
            return 'OG';

        case 'LE':
        case 'RE':
            return 'DE';
        case 'MLB':
            return 'ILB';

        case 'LOLB':
        case 'ROLB':
            return 'OLB';
        case 'PR':
        case 'KR':
        case 'FG':
        case 'STU':
            return individualPlayerPosition;
        default:
            return pos;
    }
};

export const GetShotgunRating = (value) => {
    if (value === 1) {
        return 'Shotgun';
    } else if (value === -1) {
        return 'Under Center';
    }
    return 'Balanced';
};
