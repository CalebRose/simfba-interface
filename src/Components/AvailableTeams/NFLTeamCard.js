import React from 'react';
import { GetMobileCardClass } from '../../Constants/CSSClassHelper';
import { getLogo } from '../../Constants/getLogo';

const NFLTeamCard = ({ team, request, disable, viewMode, retro }) => {
    const [requested, setRequested] = React.useState(false);

    const logo = getLogo(team.TeamName + ' ' + team.Mascot, retro);

    const sendRequest = (event) => {
        if (disable === false) {
            const role = event.target.value;
            request(team, role);
            setRequested(true);
        }
    };

    const teamColors = {
        color: '#fff',
        // color: team.ColorThree,
        backgroundColor: team.ColorOne ? team.ColorOne : '#6c757d',
        borderColor: team.ColorOne ? team.ColorOne : '#6c757d'
    };

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
                <div className="card-content card-body">
                    <h5 className="card-title ">
                        {team.TeamName} {team.Mascot}
                    </h5>
                    <h6 className="card=subtitle mb-2 text-muted">
                        {team.Conference} {team.Division}
                    </h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item card-text">
                        <div className="row justify-content-center">
                            <div className="col-sm-auto justify-content-start w-50">
                                Owner:
                            </div>
                            <div className="col-sm-auto justify-content-end">
                                {team.NFLOwnerID > 0 ||
                                (team.NFLOwnerName &&
                                    team.NFLOwnerName.length > 0) ? (
                                    team.NFLOwnerName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="o"
                                        style={teamColors}
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
                                {team.NFLGMID > 0 ||
                                (team.NFLGMName &&
                                    team.NFLGMName.length > 0) ? (
                                    team.NFLGMName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="gm"
                                        style={teamColors}
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
                                {team.NFLCoachID > 0 ||
                                (team.NFLCoachName &&
                                    team.NFLCoachName.length > 0) ? (
                                    team.NFLCoachName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="hc"
                                        style={teamColors}
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
                                {team.NFLAssistantID > 0 ||
                                (team.NFLAssistantName &&
                                    team.NFLAssistantName.length > 0) ? (
                                    team.NFLAssistantName
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={sendRequest}
                                        value="a"
                                        style={teamColors}
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

export default NFLTeamCard;
