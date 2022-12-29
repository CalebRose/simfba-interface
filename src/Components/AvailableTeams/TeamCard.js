import React from 'react';

const TeamCard = (props) => {
    const { isFBS } = props;
    const team = { team: props.team, id: props.teamId };
    const [requested, setRequested] = React.useState(false);

    const sendRequest = () => {
        if (props.disable === false) {
            props.request(team);
            setRequested(true);
        }
    };

    return (
        <div className="col">
            <div className="card text-center team h-100">
                <img
                    className="card-img-top imageSize mx-auto"
                    src={props.logo}
                    alt="logo"
                />
                <div className="card-content card-body"></div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item card-text">
                        <h5 className="card-title ">{props.team}</h5>
                    </li>
                    <li className="list-group-item card-text">
                        <h6 className="card-subtitle">{props.mascot}</h6>
                    </li>
                    <li className="list-group-item card-text Conference">
                        {!isFBS ? <strong>FCS: </strong> : ''}
                        {props.conference}
                    </li>
                    {/* <li className="list-group-item card-text">
                        <strong>Head Coach:</strong> <i>None</i>
                    </li> */}
                </ul>
                {isFBS ? (
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
                            Unavailable
                        </p>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default TeamCard;
