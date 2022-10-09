import React from 'react';

const BBATeamCard = (props) => {
    const { ovr, off, def, team, mascot, logo, conference } = props;
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
                        <strong>Overall:</strong> {ovr}
                    </li>
                    <li className="list-group-item card-text">
                        <strong>Offense:</strong> {off}
                    </li>
                    <li className="list-group-item card-text">
                        <strong>Defense:</strong> {def}
                    </li>
                </ul>
                <footer
                    onClick={sendRequest}
                    className={
                        props.disable ? 'card-footer disabled' : 'card-footer'
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
            </div>
        </div>
    );
};

export default BBATeamCard;
