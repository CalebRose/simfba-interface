export const HasStateBonus = (croot, tp) => {
    return croot.State === tp.State;
};

export const HasRegionBonus = (croot, tp) => {
    if (croot.Country !== 'USA' || croot.State === tp.State) return false;
    switch (tp.Region) {
        case 'Mid-Atlantic':
            return (
                croot.State === 'New York' ||
                croot.State === 'Pennsylvania' ||
                croot.State === 'New Jersey' ||
                croot.State === 'Delaware' ||
                croot.State === 'Maryland' ||
                croot.State === 'District of Columbia' ||
                croot.State === 'DC' ||
                croot.State === 'Virginia' ||
                croot.State === 'West Virginia'
            );
        case 'Midwest':
            return (
                croot.State === 'Ohio' ||
                croot.State === 'Indiana' ||
                croot.State === 'Kentucky' ||
                croot.State === 'Michigan' ||
                croot.State === 'Illinois' ||
                croot.State === 'Iowa' ||
                croot.State === 'Missouri' ||
                croot.State === 'Wisconsin' ||
                croot.State === 'Minnesota'
            );
        case 'Northeast':
            return (
                croot.State === 'Maine' ||
                croot.State === 'Rhode Island' ||
                croot.State === 'New Hampshire' ||
                croot.State === 'Connecticut' ||
                croot.State === 'Vermont'
            );
        case 'Pacific':
            return (
                croot.State === 'Washington' ||
                croot.State === 'Oregon' ||
                croot.State === 'Idaho' ||
                croot.State === 'Nevada' ||
                croot.State === 'Utah' ||
                croot.State === 'California' ||
                croot.State === 'Alaska' ||
                croot.State === 'Hawaii' ||
                croot.State === 'American Samoa' ||
                croot.State === 'Guam'
            );
        case 'Plains':
            return (
                croot.State === 'North Dakota' ||
                croot.State === 'South Dakota' ||
                croot.State === 'Nebraska' ||
                croot.State === 'Kansas' ||
                croot.State === 'Colorado' ||
                croot.State === 'Wyoming' ||
                croot.State === 'Montana'
            );
        case 'Southeast':
            return (
                croot.State === 'Tennessee' ||
                croot.State === 'North Carolina' ||
                croot.State === 'South Carolina' ||
                croot.State === 'Georgia' ||
                croot.State === 'Louisiana' ||
                croot.State === 'Mississippi' ||
                croot.State === 'Alabama' ||
                croot.State === 'Florida' ||
                croot.State === 'Puerto Rico'
            );
        case 'Southwest':
            return (
                croot.State === 'Texas' ||
                croot.State === 'Oklahoma' ||
                croot.State === 'Arkansas' ||
                croot.State === 'New Mexico' ||
                croot.State === 'Arizona'
            );

        default:
            return false;
    }
};
