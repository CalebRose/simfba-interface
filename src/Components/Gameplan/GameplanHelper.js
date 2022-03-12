export const GetMaxForPassPlays = (scheme, idx) => {
    let max = '20';
    if (idx === 0) {
        // Quick Passes
        if (scheme === 'Pro') {
            max = '45';
        } else {
            max = '50';
        }
    } else if (idx === 1) {
        // Short Passes
        if (scheme === 'Pro') {
            max = '45';
        } else {
            max = '50';
        }
    } else if (idx === 2) {
        // Long Passes
        if (scheme === 'Pro') {
            max = '45';
        } else if (scheme === 'Air Raid') {
            max = '50';
        } else {
            max = '35';
        }
    } else if (idx === 3) {
        // Screens. Do nothing.
    } else if (idx === 4) {
        // PA Short
        if (scheme === 'Double Wing Option') {
            max = '30';
        }
    } else {
        // PA Long
        if (scheme === 'Double Wing Option') {
            max = '30';
        }
    }
    return max;
};

export const GetDefenseFormationLabel = (idx) => {
    let name = 'DefPersonnel';
    if (idx === 0) {
        name = name.concat('One');
    } else if (idx === 1) {
        name = name.concat('Two');
    } else {
        name = name.concat('Three');
    }
    return name;
};

export const ValidateRunPlayDistribution = (gp) => {
    let valid = true;

    if (
        gp.RunOutsideLeft > 50 ||
        gp.RunOutsideRight > 50 ||
        gp.RunInsideLeft > 50 ||
        gp.RunInsideRight > 50 ||
        gp.RunPowerLeft > 50 ||
        gp.RunPowerRight > 50 ||
        gp.RunDrawLeft > 15 ||
        gp.RunDrawRight > 15
    ) {
        valid = false;
    }

    return valid;
};

export const ValidatePassPlayDistribution = (gp) => {
    const scheme = gp.OffensiveScheme;

    switch (scheme) {
        case 'Air Raid':
            if (gp.PassQuick > 50) {
                return false;
            }

            if (gp.PassShort > 50) {
                return false;
            }
            if (gp.PassLong > 50) {
                return false;
            }

            if (gp.PassScreen > 20) {
                return false;
            }

            if (gp.PassPAShort > 20) {
                return false;
            }

            if (gp.PassPALong > 20) {
                return false;
            }
            break;
        case 'Pro':
            if (gp.PassQuick > 45) {
                return false;
            }

            if (gp.PassShort > 45) {
                return false;
            }
            if (gp.PassLong > 45) {
                return false;
            }

            if (gp.PassScreen > 20) {
                return false;
            }

            if (gp.PassPAShort > 20) {
                return false;
            }

            if (gp.PassPALong > 20) {
                return false;
            }
            break;
        case 'Double Wing Option':
            if (gp.PassQuick > 50) {
                return false;
            }

            if (gp.PassShort > 50) {
                return false;
            }

            if (gp.PassLong > 50) {
                return false;
            }

            if (gp.PassScreen > 20) {
                return false;
            }

            if (gp.PassPAShort > 30) {
                return false;
            }

            if (gp.PassPALong > 30) {
                return false;
            }
            break;
        case 'Spread Option':
            if (gp.PassQuick > 50) {
                return false;
            }

            if (gp.PassShort > 50) {
                return false;
            }
            if (gp.PassLong > 50) {
                return false;
            }

            if (gp.PassScreen > 20) {
                return false;
            }

            if (gp.PassPAShort > 20) {
                return false;
            }

            if (gp.PassPALong > 20) {
                return false;
            }
            break;
        default:
            break;
    }

    return true;
};
