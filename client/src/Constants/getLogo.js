import logos from './logos';

export const getLogo = team => {
  switch (team) {
    default:
      return logos.Unknown;
  }
};
