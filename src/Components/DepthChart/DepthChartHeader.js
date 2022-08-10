import React from 'react';

const DepthChartHeader = (props) => {
    const { label, abbr, idx, isMobile } = props;
    return (
        <th scope="col">
            {isMobile ? (
                idx > 7 ? (
                    <abbr title={abbr !== undefined ? label : ''}>
                        {abbr !== undefined ? abbr : label}
                    </abbr>
                ) : (
                    <abbr>{abbr !== undefined ? abbr : label}</abbr>
                )
            ) : (
                <abbr>{label}</abbr>
            )}
        </th>
    );
};

export default DepthChartHeader;
