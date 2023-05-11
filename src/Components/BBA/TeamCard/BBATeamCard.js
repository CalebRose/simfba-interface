import React from 'react';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';

const BBATeamCard = (props) => {
    const {
        ovr,
        off,
        def,
        team,
        mascot,
        logo,
        conference,
        teamId,
        coach,
        disable,
        viewMode
    } = props;
    const [requested, setRequested] = React.useState(false);

    const sendRequest = () => {
        if (props.disable === false) {
            props.request({ team, teamId });
            setRequested(true);
        }
    };
    const mobileClass = GetMobileCardClass(viewMode);
    const cardClass = `${mobileClass} text-center h-100`;

    return (
        <div className="col">
            <div className={cardClass}>
                <img
                    className="card-img-top imageSize mx-auto"
                    src={logo}
                    alt="logo"
                />
                <div className="card-body">
                    <h5 className="card-title ">
                        {team} {mascot}
                    </h5>
                    <h6 className="card-subtitle mb-1 text-muted">
                        {conference} Conference
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
                {coach.length === 0 || coach === 'AI' ? (
                    <footer
                        onClick={sendRequest}
                        className={
                            disable ? 'card-footer disabled' : 'card-footer'
                        }
                    >
                        <p
                            className={
                                disable && !requested
                                    ? 'card-footer-item card-footer-item-disabled'
                                    : 'card-footer-item card-footer-item-active'
                            }
                        >
                            {!requested ? 'Request' : 'Request Sent!'}
                        </p>
                    </footer>
                ) : (
                    <footer className="card-footer disabled">
                        <p className="card-footer-item card-footer-item-disabled">
                            Coach {coach}
                        </p>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default BBATeamCard;
