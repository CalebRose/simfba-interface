export const MapOptions = (arr) => {
    return [
        ...arr.map((x) => {
            return { label: x, value: x };
        })
    ];
};

export const MapObjOptions = (arr) => {
    return [
        ...arr.map((x) => {
            return { label: x.name, value: x.abbr };
        })
    ];
};

export const MapTeamOptions = (arr) => {
    return [
        ...arr.map((x) => {
            return { label: x.TeamName, value: x.ID };
        })
    ];
};

export const MapConferenceOptions = (arr) => {
    return [
        ...arr.map((x) => {
            return { label: x.ConferenceName, value: x.ID };
        })
    ];
};
