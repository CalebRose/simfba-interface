import React from 'react';

export const SchemeInfo = ({ formationMap, scheme }) => {
    const schemeMap = formationMap[`${scheme}`];
    const { SchemeFits, BadFits, Notes, Strengths, Weaknesses, Ranges } =
        schemeMap;
    const schemeLabel = SchemeFits.join(', ');
    const badFitsLabel = BadFits.join(', ');
    const strengthsLabel = Strengths ? Strengths.join(', ') : '';
    const weaknessLabel = Weaknesses ? Weaknesses.join(', ') : '';
    return (
        <>
            <div className="row mb-2">
                <h6>Scheme Fits</h6>
                <p className="text-small">{schemeLabel}</p>
            </div>
            <div className="row mb-2">
                <h6>Bad Fits</h6>
                <p className="text-small">{badFitsLabel}</p>
            </div>
            {Strengths && (
                <div className="row mb-2">
                    <h6>Strengths</h6>
                    <p className="text-small">{strengthsLabel}</p>
                </div>
            )}
            {Weaknesses && (
                <div className="row mb-2">
                    <h6>Weaknesses</h6>
                    <p className="text-small">{weaknessLabel}</p>
                </div>
            )}
            {Ranges && (
                <div className="row mb-2">
                    <h6>Min-Max Ranges (0 to 100)</h6>
                    <p className="text-small">
                        Traditional Run: {Ranges['TraditionalRun']['Min']}-
                        {Ranges['TraditionalRun']['Max']}
                    </p>
                    <p className="text-small">
                        Option Run: {Ranges['OptionRun']['Min']}-
                        {Ranges['OptionRun']['Max']}
                    </p>
                    <p className="text-small">
                        RPO: {Ranges['RPO']['Min']}-{Ranges['RPO']['Max']}
                    </p>
                    <p className="text-small">
                        Pass: {Ranges['Pass']['Min']}-{Ranges['Pass']['Max']}
                    </p>
                </div>
            )}
            {Notes && (
                <div className="row mb-2">
                    <p className="text-small">{Notes}</p>
                </div>
            )}
        </>
    );
};
