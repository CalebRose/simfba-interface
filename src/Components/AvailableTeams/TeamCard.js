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
    const cardClass = `${mobileClass} text-center h-100 d-flex flex-column`;

    return (
        <div className="col">
            <div className={cardClass}>
                <div className="row g-0 h-100">
                    <div className="col-3 d-flex align-items-center justify-content-center">
                        <img
                            className="card-img-top imageSize mx-auto mt-2 ps-3"
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <div className={isFBS ? `col-6` : 'col-9'}>
                        <div className="card-content card-body">
                            <h5 className="card-title ">{team}</h5>
                            <h6 className="card-subtitle">{mascot}</h6>
                            <p className="card-text">
                                {!isFBS ? <strong>FCS: </strong> : ''}
                                {conference}
                            </p>
                            {coach.length > 0 && coach !== 'AI' && (
                                <p className="card-text">
                                    {!isFBS ? 'Unavailable' : `Coach: ${coach}`}
                                </p>
                            )}
                        </div>
                    </div>
                    {isFBS && (
                        <div
                            className="col-3 d-flex align-items-center justify-content-center"
                            style={{
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                paddingRight: '8px'
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-outline-primary h-100 w-100"
                                disabled={
                                    props.disable ||
                                    (coach.length > 0 && coach !== 'AI')
                                }
                                onClick={sendRequest}
                            >
                                {coach.length > 0 && coach !== 'AI'
                                    ? 'Claimed'
                                    : 'Request'}
                            </button>
                        </div>
                    )}
                </div>
                {/* {isFBS && (coach.length === 0 || coach === 'AI') ? (
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
                )} */}
            </div>
        </div>
    );
};

export default TeamCard;
