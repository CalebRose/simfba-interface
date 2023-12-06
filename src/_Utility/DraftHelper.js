import firebase from 'firebase';

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
        endTime: firebase.firestore.Timestamp.fromDate(endTime),
        isPaused: false,
        seconds: (endTime.getTime() - Date.now()) / 1000,
        startAt: firebase.firestore.Timestamp.fromDate(new Date())
    };

    updateData(newData);
};

export const GetPauseTimer = (data, updateData) => {
    const newData = { ...data, isPaused: true, seconds: timeLeft };
    updateData(newData);
};

export const GetResetTimer = (data, updateData) => {
    const { currentPick } = data;
    let seconds = 0;
    if (currentPick < 32) {
        seconds = 300;
    } else {
        seconds = 120;
    }
    const endTime = firebase.firestore.Timestamp.fromDate(
        new Date(Date.now() + seconds * 1000)
    ); // Current time + 4 minutes
    const newData = {
        ...data,
        endTime,
        isPaused: true,
        seconds,
        startAt: firebase.firestore.Timestamp.fromDate(new Date(Date.now()))
    }; // Current time + 4 minutes  };
    updateData(newData);
};
