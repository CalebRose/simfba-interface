import React, { useEffect } from 'react';
import { getLogo } from '../../Constants/getLogo';

const StandingsRow = (props) => {
    const { row, rank, retro } = props;
    const logoKey = row.TeamName + ' ' + row.Mascot;
    const logo = getLogo(logoKey, retro);
    return (
        <div className="row mb-2">
            <div className="col">{rank}</div>
            <div className="col">
                <img className="image-standings-logo" src={logo} />
            </div>
            <div className="col">{row.ConferenceWins}</div>
            <div className="col">{row.ConferenceLosses}</div>
            {/* <div className="col">{row.ConferenceTies}</div> */}
            <div className="col">{row.DivisionWins}</div>
            <div className="col">{row.DivisionLosses}</div>
            {/* <div className="col">{row.DivisionTies}</div> */}
            <div className="col">{row.TotalWins}</div>
            <div className="col">{row.TotalLosses}</div>
            <div className="col">{row.TotalTies}</div>
        </div>
    );
};

const NFLStandingsCard = ({ standings, retro }) => {
    const [standingsOne, setStandingsOne] = React.useState([]);

    const label =
        standings.length > 0 &&
        `${standings[0].ConferenceName} ${standings[0].DivisionName}`;
    if (standings.length > 0) {
    }

    useEffect(() => {
        if (standings !== undefined || standings !== null) {
            setStandingsOne(() => standings);
        }
    }, [standings]);

    return (
        <div className="d-flex flex-column nfl-standings-container me-1 p-2 border rounded">
            <div className="row">
                <h6>{label} Standings</h6>
            </div>
            <div className="row">
                <div className="col">Rank</div>
                <div className="col">Team</div>
                <div className="col" title="Conference Wins">
                    C.W.
                </div>
                <div className="col" title="Conference Losses">
                    C.L.
                </div>
                <div className="col" title="Division Wins">
                    D.W.
                </div>
                <div className="col" title="Division Losses">
                    D.L.
                </div>
                <div className="col" title="Total Wins">
                    T.W.
                </div>
                <div className="col" title="Total Losses">
                    T.L.
                </div>
                <div className="col" title="Total Ties">
                    T.T.
                </div>
            </div>
            {standingsOne.length > 0 &&
                standingsOne.map((x, idx) => (
                    <StandingsRow row={x} rank={idx + 1} retro={retro} />
                ))}
        </div>
    );
};

export default NFLStandingsCard;
