export const MapOptions = (arr) => {
    return [
        ...arr.map((x) => {
            return { label: x, value: x };
        })
    ];
};
