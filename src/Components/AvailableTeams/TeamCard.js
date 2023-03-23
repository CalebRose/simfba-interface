import React from 'react';
import { GetMobileCardClass } from '../../Constants/CSSClassHelper';

const TeamCard = (props) => {
    const {
        isFBS,
        team,
        teamId,
        mascot,
        logo,
        conference,
        disable,
        coach,
        viewMode
    } = props;
    const teamObj = { team: team, id: teamId };
    const [requested, setRequested] = React.useState(false);

    const sendRequest = () => {
        if (disable === false) {
            props.request(teamObj);
            setRequested(true);
        }
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
                <div className="card-content card-body"></div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item card-text">
                        <h5 className="card-title ">{team}</h5>
                    </li>
                    <li className="list-group-item card-text">
                        <h6 className="card-subtitle">{mascot}</h6>
                    </li>
                    <li className="list-group-item card-text Conference">
                        {!isFBS ? <strong>FCS: </strong> : ''}
                        {conference}
                    </li>
                    {/* <li className="list-group-item card-text">
                        <strong>Head Coach:</strong> <i>None</i>
                    </li> */}
                </ul>
                {isFBS && (coach.length === 0 || coach === 'AI') ? (
                    <footer
                        onClick={sendRequest}
                        className={
                            props.disable
                                ? 'card-footer disabled'
                                : 'card-footer'
                        }
                    >
                        <p
                            className={
                                props.disable && !requested
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
                            {!isFBS ? 'Unavailable' : `Coach: ${coach}`}
                        </p>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default TeamCard;
