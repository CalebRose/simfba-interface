import React from 'react';

export const StatsPageButton = ({
    statType,
    action,
    value,
    label,
    disable
}) => (
    <button
        type="button"
        className={statType === value ? 'btn btn-primary' : 'btn btn-secondary'}
        onClick={action}
        value={value}
        style={{ fontSize: '1.6vh' }}
        disabled={disable}
    >
        {label}
    </button>
);
