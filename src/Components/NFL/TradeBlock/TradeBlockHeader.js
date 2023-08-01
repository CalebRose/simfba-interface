import React from 'react';

const PlayerView = ({ isNBA }) => (
    <>
        <tr>
            <th scope="col" style={{ width: 175 }}>
                Name
            </th>
            <th scope="col">Position</th>
            <th scope="col" style={{ width: 175 }}>
                Archetype
            </th>
            <th scope="col">Overall</th>
            <th scope="col">Age</th>
            <th scope="col">Experience</th>
            <th scope="col">Potential</th>
            <th scope="col">Contract Value</th>
            {isNBA ? (
                <>
                    <th scope="col">Year 1 Total</th>
                </>
            ) : (
                <>
                    <th scope="col">Year 1 Bonus</th>
                    <th scope="col">Year 1 Salary</th>
                </>
            )}
        </tr>
    </>
);

const DraftPickView = () => (
    <>
        <tr>
            <th scope="col">Season</th>
            <th scope="col">Round</th>
            <th scope="col">Pick Number</th>
            <th scope="col">Value</th>
            <th scope="col">Original Team</th>
        </tr>
    </>
);

export const TradeBlockHeader = ({ currentView, isNBA }) =>
    currentView === 'Players' ? (
        <PlayerView isNBA={isNBA} />
    ) : (
        <DraftPickView />
    );
