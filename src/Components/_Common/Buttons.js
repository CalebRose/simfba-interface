import React from 'react';

export const StatsPageButton = ({ statType, action, value, label }) => (
    <button
        type="button"
        className={statType === value ? 'btn btn-primary' : 'btn btn-secondary'}
        onClick={action}
        value={value}
    >
        {label}
    </button>
);
