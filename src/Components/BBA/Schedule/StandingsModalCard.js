import React from 'react';
import { getLogo } from '../../../Constants/getLogo';

const StandingsRow = (props) => {
    const { row, rank } = props;
    const logo = getLogo(row.TeamAbbr);
    return (
        <div className="row mb-2">
            <div className="col">{rank}</div>
            <div className="col">
                <img className="image-standings-logo" src={logo} />
            </div>
            <div className="col">{row.ConferenceWins}</div>
            <div className="col">{row.ConferenceLosses}</div>
            <div className="col">{row.TotalWins}</div>
            <div className="col">{row.TotalLosses}</div>
        </div>
    );
};

const StandingsCard = (props) => {
    const { standings } = props;

    const Conference = standings.length > 0 ? standings[0].ConferenceName : '';

    return (
        <div className="d-flex flex-column standings-container me-1 p-2 border rounded">
            <div className="row">
                <h6>{Conference}</h6>
            </div>
            <div className="row">
                <div className="col">Rank</div>
                <div className="col">Team</div>
                <div className="col">C.W.</div>
                <div className="col">C.L.</div>
                <div className="col">T.W.</div>
                <div className="col">T.L.</div>
            </div>
            {standings.map((x, idx) => (
                <StandingsRow row={x} rank={idx + 1} />
            ))}
        </div>
    );
};

export default StandingsCard;
