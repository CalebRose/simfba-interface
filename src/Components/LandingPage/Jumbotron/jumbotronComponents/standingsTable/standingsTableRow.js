import React from 'react';

const StandingsTableRow = (props) => {
    const { record, rank, secondDivision } = props;
    return (
        <div
            className={
                secondDivision === true && props.rank === 1 ? 'row mt-3' : 'row'
            }
        >
            <div className="col-sm-1">{rank}</div>
            <div className="col-sm-3">{record.TeamName}</div>
            <div className="col-sm-2">{record.ConferenceWins}</div>
            <div className="col-sm-2">{record.ConferenceLosses}</div>
            <div className="col-sm-1">{record.TotalWins}</div>
            <div className="col-sm-1">{record.TotalLosses}</div>
        </div>
    );
};

export default StandingsTableRow;
