import logos from './logos';

export const getLogo = (team) => {
  switch (team) {
    case 'Baylor':
      return logos.Baylor;
    case 'Florida':
      return logos.Florida;
    case 'Louisiana State':
      return logos.LSU;
    case 'Mighican':
      return logos.Michigan;
    case 'Washington State':
      return logos.Washington_State;
    default:
      return logos.Unknown;
  }
};
