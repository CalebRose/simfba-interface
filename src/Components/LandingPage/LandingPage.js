import React from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants/constants';
import CBBHomePage from './Jumbotron/jumbotronComponents/cbb/CBBHomepage';
import CFBHomepage from './Jumbotron/jumbotronComponents/cfb/CFBHomepage';
import NBAHomepage from './Jumbotron/jumbotronComponents/nba/NBAHomepage';
import NFLHomepage from './Jumbotron/jumbotronComponents/nfl/NFLHomepage';

const LandingPage = () => {
    const [sport, setSport] = React.useState('CFB');
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
                            className="btn btn-primary btn-sm me-2"
                            value="CFB"
                            onClick={selectSport}
                        >
                            CFB Team
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            value="NFL"
                            onClick={selectSport}
                        >
                            NFL Team
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            value="CBB"
                            onClick={selectSport}
                        >
                            CBB Team
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
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
            ) : sport === constants.CFB ? (
                <CFBHomepage />
            ) : sport === constants.NFL ? (
                <NFLHomepage />
            ) : (
                'No Team? Click the Available Teams button'
            )}
        </div>
    );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(LandingPage);
