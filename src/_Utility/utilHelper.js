export const LowerCaseCheck = (stringA, stringB) => {
    return stringA.toLowerCase() === stringB.toLowerCase();
};

export const HeightToFeetAndInches = (height) => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return {
        feet: feet,
        inches: inches
    };
};
