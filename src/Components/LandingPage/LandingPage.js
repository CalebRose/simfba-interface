import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants/constants';
import CBBHomePage from './Jumbotron/jumbotronComponents/cbb/CBBHomepage';
import CFBHomepage from './Jumbotron/jumbotronComponents/cfb/CFBHomepage';
import NBAHomepage from './Jumbotron/jumbotronComponents/nba/NBAHomepage';
import NFLHomepage from './Jumbotron/jumbotronComponents/nfl/NFLHomepage';

const LandingPage = ({ currentUser }) => {
    const [sport, setSport] = React.useState('');

    const selectSport = (event) => {
        setSport(event.target.value);
    };

    useEffect(() => {
        if (currentUser) {
            if (currentUser.teamId) {
                setSport('CFB');
            } else if (currentUser.nfl_id) {
                setSport('NFL');
            } else if (currentUser.cbb_id) {
                setSport('CBB');
            } else if (currentUser.nba_id) {
                setSport('NBA');
            } else {
                setSport('');
            }
        }
    }, [currentUser]);

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col col-sm justify-content-start">
                    <div className="btn-group">
                        {currentUser && currentUser.teamId ? (
                            <button
                                type="button"
                                className="btn btn-primary btn-sm me-2"
                                value="CFB"
                                onClick={selectSport}
                            >
                                CFB Team
                            </button>
                        ) : (
                            ''
                        )}
                        {currentUser && currentUser.nfl_id ? (
                            <button
                                type="button"
                                className="btn btn-primary btn-sm me-2"
                                value="NFL"
                                onClick={selectSport}
                            >
                                NFL Team
                            </button>
                        ) : (
                            ''
                        )}
                        {currentUser && currentUser.cbb_id ? (
                            <button
                                type="button"
                                className="btn btn-primary btn-sm me-2"
                                value="CBB"
                                onClick={selectSport}
                            >
                                CBB Team
                            </button>
                        ) : (
                            ''
                        )}
                        {currentUser && currentUser.nba_id ? (
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                value="NBA"
                                onClick={selectSport}
                            >
                                NBA Team
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
            </div>
            {currentUser && sport === constants.CBB ? (
                <CBBHomePage />
            ) : currentUser && sport === constants.NBA ? (
                <NBAHomepage />
            ) : currentUser && sport === constants.CFB ? (
                <CFBHomepage />
            ) : currentUser && sport === constants.NFL ? (
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
