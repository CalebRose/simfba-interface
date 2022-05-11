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
