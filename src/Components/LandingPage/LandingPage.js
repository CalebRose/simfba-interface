import React from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants/constants';
import CBBHomePage from './Jumbotron/jumbotronComponents/cbb/CBBHomepage';
import NBAHomepage from './Jumbotron/jumbotronComponents/nba/NBAHomepage';

const LandingPage = () => {
    const [sport, setSport] = React.useState('CBB');
    const selectSport = (event) => {
        setSport(event.target.value);
    };

    return (
        <div className="landingPage container">
            <div className="row mt-3">
                <div className="col col-sm justify-content-start">
                    <div className="btn-group">
                        <button
                            type="button"
                            class="btn btn-primary btn-sm me-2"
                            value="CFB"
                        >
                            CFB Team
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary btn-sm me-2"
                            value="NFL"
                        >
                            NFL Team
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary btn-sm me-2"
                            value="CBB"
                            onClick={selectSport}
                        >
                            CBB Team
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            value="NBA"
                            onClick={selectSport}
                        >
                            NBA Team
                        </button>
                    </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
            </div>
            {sport === constants.CBB ? (
                <CBBHomePage />
            ) : sport === constants.NBA ? (
                <NBAHomepage />
            ) : (
                ''
            )}
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(LandingPage);
