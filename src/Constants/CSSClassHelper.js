export const GetModalClass = (viewMode) => {
    return `modal-content ${viewMode === 'dark' ? 'bg-dark' : ''}`;
};

export const GetTableHoverClass = (viewMode) => {
    return `table table-hover ${viewMode === 'dark' ? 'table-dark' : ''}`;
};

export const GetTableSmallClass = (viewMode) => {
    return `table table-sm ${viewMode === 'dark' ? 'table-dark' : ''}`;
};

export const GetTableClass = (viewMode) => {
    return `table table-hover ${viewMode === 'dark' ? 'table-dark' : ''}`;
};

export const GetMobileCardClass = (theme) => {
    return `card ${theme === 'dark' ? 'text-bg-dark' : ''}`;
};
