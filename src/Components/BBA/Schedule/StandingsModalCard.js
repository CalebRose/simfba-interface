import React, { useEffect } from 'react';
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
    const [standingsOne, setStandingsOne] = React.useState([]);
    const [standingsTwo, setStandingsTwo] = React.useState([]);

    useEffect(() => {
        if (standings !== undefined || standings !== null) {
            if (standings[0].DivisionID > 0) {
                const division1Standings = standings.filter(
                    (x) => x.DivisionID === standings[0].DivisionID
                );
                const division2Standings = standings.filter(
                    (x) => x.DivisionID !== standings[0].DivisionID
                );
                setStandingsOne(() => division1Standings);
                setStandingsTwo(() => division2Standings);
            } else {
                setStandingsOne(() => standings);
            }
        }
    }, [standings]);

    const Conference =
        standingsOne.length > 0 ? standingsOne[0].ConferenceName : '';

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
            {standingsOne.length > 0 &&
                standingsOne.map((x, idx) => (
                    <StandingsRow row={x} rank={idx + 1} />
                ))}
            {standingsTwo.length > 0 && standings[0].DivisionID > 0 ? (
                <>
                    <br />
                    {standingsTwo.map((x, idx) => (
                        <StandingsRow row={x} rank={idx + 1} />
                    ))}
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default StandingsCard;
