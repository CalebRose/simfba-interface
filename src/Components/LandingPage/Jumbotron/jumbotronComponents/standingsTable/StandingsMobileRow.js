import React from 'react';

const StandingsMobileRow = (props) => {
    const { record, rank, secondDivision } = props;
    return (
        <div
            className={
                secondDivision === true && props.rank === 1
                    ? 'card mt-2 mb-2'
                    : 'card mb-2'
            }
        >
            <div className="card-body">
                <h5 className="card-title">{record.TeamName}</h5>
                <h6 className="card-subtitle mb-2">Rank: {rank}</h6>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Conference Record</li>
                <li className="list-group-item">
                    {record.ConferenceWins} - {record.ConferenceLosses}
                </li>
                <li className="list-group-item">Season Record</li>
                <li className="list-group-item">
                    {record.TotalWins} - {record.TotalLosses}
                </li>
            </ul>
        </div>
    );
};

export default StandingsMobileRow;
