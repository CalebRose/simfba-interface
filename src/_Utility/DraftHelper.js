import { Timestamp } from 'firebase/firestore';

export const calculateEndTimeNFL = (currentPick, timeLeft, isPaused) => {
    let seconds = 0;
    if (currentPick < 33 && timeLeft === 0) {
        seconds = 300; // 5 minutes
    } else if (currentPick > 32 && timeLeft === 0) {
        seconds = 180; // 3 minutes
    } else if (currentPick > 137 && timeLeft === 0) {
        seconds = 120; // 2 minutes
    } else if (isPaused && timeLeft > 0) {
        seconds = timeLeft;
    }

    return new Date(Date.now() + seconds * 1000);
};

export const calculateEndTime = (currentPick, timeLeft, isPaused) => {
    let seconds = 0;
    if (currentPick < 32 && timeLeft === 0) {
        seconds = 300; // 5 minutes
    } else if (currentPick >= 32 && timeLeft === 0) {
        seconds = 120; // 2 minutes
    } else if (isPaused && timeLeft > 0) {
        seconds = timeLeft;
    }

    return new Date(Date.now() + seconds * 1000);
};

export const GetStartTimerNFL = (
    data,
    currentPick,
    timeLeft,
    isPaused,
    updateData
) => {
    const endTime = calculateEndTimeNFL(currentPick, timeLeft, isPaused);
    const newData = {
        ...data,
        endTime: Timestamp.fromDate(endTime),
        isPaused: false,
        seconds: (endTime.getTime() - Date.now()) / 1000,
        startAt: Timestamp.fromDate(new Date())
    };

    updateData(newData);
};

export const GetStartTimer = (
    data,
    currentPick,
    timeLeft,
    isPaused,
    updateData
) => {
    const endTime = calculateEndTime(currentPick, timeLeft, isPaused);
    const newData = {
        ...data,
        endTime: Timestamp.fromDate(endTime),
        isPaused: false,
        seconds: (endTime.getTime() - Date.now()) / 1000,
        startAt: Timestamp.fromDate(new Date())
    };

    updateData(newData);
};

export const GetPauseTimer = (data, timeLeft, updateData) => {
    const newData = { ...data, isPaused: true, seconds: timeLeft };
    updateData(newData);
};

export const GetResetTimer = (data, updateData) => {
    const { currentPick } = data;
    let seconds = 0;
    if (currentPick < 33) {
        seconds = 300;
    } else if (currentPick < 131) {
        seconds = 180;
    } else {
        seconds = 120;
    }
    const endTime = Timestamp.fromDate(new Date(Date.now() + seconds * 1000)); // Current time + 4 minutes
    const newData = {
        ...data,
        endTime,
        isPaused: true,
        seconds,
        startAt: Timestamp.fromDate(new Date(Date.now()))
    }; // Current time + 4 minutes  };
    updateData(newData);
};

export const GetScoutableAttributes = (pos, arch) => {
    switch (pos) {
        case 'QB':
            return [
                'Throw Power',
                'Throw Accuracy',
                'Football IQ',
                'Agility',
                'Speed',
                'Stamina',
                'Potential Grade'
            ];
        case 'RB':
            return [
                'Speed',
                'Agility',
                'Carrying',
                'Strength',
                'Football IQ',
                'Catching',
                'Potential Grade'
            ];
        case 'FB':
            return [
                'Speed',
                'Agility',
                'Carrying',
                'Strength',
                'Pass Block',
                'Run Block',
                'Potential Grade'
            ];
        case 'TE':
            return [
                'Speed',
                'Agility',
                'Carrying',
                'Catching',
                'Route Running',
                'Strength',
                'Pass Block',
                'Run Block',
                'Potential Grade'
            ];
        case 'WR':
            return [
                'Speed',
                'Agility',
                'Carrying',
                'Catching',
                'Route Running',
                'Potential Grade'
            ];
        case 'OG':
        case 'OT':
        case 'C':
            return [
                'Agility',
                'Strength',
                'Pass Block',
                'Run Block',
                'Football IQ',
                'Potential Grade'
            ];
        case 'DT':
        case 'DE':
            return [
                'Speed',
                'Agility',
                'Tackle',
                'Strength',
                'Pass Rush',
                'Run Defense',
                'Football IQ',
                'Potential Grade'
            ];
        case 'OLB':
        case 'ILB':
            return [
                'Speed',
                'Agility',
                'Tackle',
                'Pass Rush',
                'Run Defense',
                'Man Coverage',
                'Zone Coverage',
                'Football IQ',
                'Potential Grade'
            ];
        case 'CB':
        case 'FS':
        case 'SS':
            return [
                'Speed',
                'Agility',
                'Tackle',
                'Strength',
                'Man Coverage',
                'Zone Coverage',
                'Catching',
                'Football IQ',
                'Potential Grade'
            ];
        case 'P':
        case 'K':
            return [
                'Punt Power',
                'Punt Accuracy',
                'Kick Power',
                'Kick Accuracy',
                'Football IQ',
                'Potential Grade'
            ];
        case 'ATH':
            if (arch === 'Field General') {
                return [
                    'Football IQ',
                    'Throw Power',
                    'Throw Accuracy',
                    'Speed',
                    'Agility',
                    'Man Coverage',
                    'Zone Coverage',
                    'Potential Grade'
                ];
            } else if (arch === 'Triple-Threat') {
                return [
                    'Football IQ',
                    'Throw Power',
                    'Throw Accuracy',
                    'Speed',
                    'Agility',
                    'Carrying',
                    'Catching',
                    'Route Running',
                    'Potential Grade'
                ];
            } else if (arch === 'Wingback') {
                return [
                    'Football IQ',
                    'Speed',
                    'Agility',
                    'Carrying',
                    'Catching',
                    'Route Running',
                    'Man Coverage',
                    'Zone Coverage',
                    'Potential Grade'
                ];
            } else if (arch === 'Slotback') {
                return [
                    'Football IQ',
                    'Strength',
                    'Agility',
                    'Carrying',
                    'Catching',
                    'Route Running',
                    'Pass Block',
                    'Run Block',
                    'Potential Grade'
                ];
            } else if (arch === 'Lineman') {
                return [
                    'Football IQ',
                    'Strength',
                    'Agility',
                    'Pass Block',
                    'Run Block',
                    'Tackle',
                    'Pass Rush',
                    'Run Defense',
                    'Potential Grade'
                ];
            } else if (
                arch === 'Strongside' ||
                arch === 'Weakside' ||
                arch === 'Bandit'
            ) {
                return [
                    'Football IQ',
                    'Speed',
                    'Agility',
                    'Tackle',
                    'Pass Rush',
                    'Run Defense',
                    'Man Coverage',
                    'Zone Coverage',
                    'Potential Grade'
                ];
            } else if (arch === 'Return Specialist') {
                return [
                    'Football IQ',
                    'Speed',
                    'Agility',
                    'Catching',
                    'Carrying',
                    'Route Running',
                    'Tackle',
                    'Potential Grade'
                ];
            } else if (arch === 'Soccer Player') {
                return [
                    'Football IQ',
                    'Speed',
                    'Agility',
                    'Catching',
                    'Punt Power',
                    'Punt Accuracy',
                    'Kick Power',
                    'Kick Accuracy',
                    'Potential Grade'
                ];
            }
            return [];

        default:
            return [];
    }
};
