import React from 'react';
import { GetMobileCardClass } from '../../Constants/CSSClassHelper';

const NBATeamCard = (props) => {
    const { ovr, off, def, team, logo, disable, viewMode, request } = props;
    const [requested, setRequested] = React.useState(false);
    const { Team, Nickname, Conference, LeagueID } = team;
    const sendRequest = () => {
        if (disable === false) {
            const role = event.target.value;
            request(team, role);
            setRequested(true);
        }
    };
    const teamColors = {};
    const mobileClass = GetMobileCardClass(viewMode);
    const cardClass = `${mobileClass} text-center h-100`;

    return (
        <div className="col">
            <div className={cardClass}>
                <img
                    className="card-img-top imageSize mx-auto mt-2"
                    src={logo}
                    alt="logo"
                />
                <div className="card-body">
                    <h5 className="card-title ">
                        {Team} {Nickname}
                    </h5>
                    <h6 className="card-subtitle mb-1 text-muted">
                        {Conference} Conference
                    </h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item card-text">
                        <div className="row">
                            <div className="col-4 border-end">
                                <strong>OVR:</strong> <p>{ovr}</p>
                            </div>
                            <div className="col-4">
                                <strong>OFF:</strong> <p>{off}</p>
                            </div>
                            <div className="col-4 border-start">
                                <strong>DEF:</strong> <p>{def}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item card-text">
                        <div className="row justify-content-center">
                            <div className="col-sm-auto justify-content-start w-50">
                                Owner:
                            </div>
                            <div className="col-sm-auto justify-content-end">
                                {team.NBAOwnerID > 0 ||
                                (team.NBAOwnerName &&
                                    team.NBAOwnerName.length > 0) ? (
                                    team.NBAOwnerName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="o"
                                        style={teamColors}
                                        disabled={LeagueID > 1}
                                    >
                                        Request
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item card-text">
                        <div className="row justify-content-center">
                            <div className="col-sm-auto justify-content-start w-50">
                                GM:
                            </div>
                            <div className="col-sm-auto justify-content-end">
                                {team.NBAGMID > 0 ||
                                (team.NBAGMName &&
                                    team.NBAGMName.length > 0) ? (
                                    team.NBAGMName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="gm"
                                        style={teamColors}
                                        disabled={LeagueID > 1}
                                    >
                                        Request
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item card-text">
                        <div className="row justify-content-center">
                            <div className="col-sm-auto justify-content-start w-50">
                                Head Coach:
                            </div>
                            <div className="col-sm-auto justify-content-end">
                                {team.NBACoachID > 0 ||
                                (team.NBACoachName &&
                                    team.NBACoachName.length > 0) ? (
                                    team.NBACoachName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="hc"
                                        style={teamColors}
                                        disabled={LeagueID > 1}
                                    >
                                        Request
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item card-text">
                        <div className="row justify-content-center">
                            <div className="col-sm-auto justify-content-start w-50">
                                Assistant:
                            </div>
                            <div className="col-sm-auto justify-content-end">
                                {team.NBAAssistantID > 0 ||
                                (team.NBAAssistantName &&
                                    team.NBAAssistantName.length > 0) ? (
                                    team.NBAAssistantName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="a"
                                        style={teamColors}
                                        disabled={LeagueID > 1}
                                    >
                                        Request
                                    </button>
                                )}
                            </div>
                        </div>
                    </li>
                </ul>
                <footer
                    className={disable ? 'card-footer disabled' : 'card-footer'}
                >
                    <p
                        className={
                            disable
                                ? 'card-footer-item card-footer-item-disabled'
                                : 'card-footer-item card-footer-item-active'
                        }
                    >
                        {!disable ? 'Request Now!' : 'Request Sent!'}
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default NBATeamCard;
