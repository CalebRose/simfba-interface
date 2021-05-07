import React from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import CBBHomePage from './jumbotronComponents/cbb/CBBHomepage';
import NBAHomepage from './jumbotronComponents/nba/NBAHomepage';

const Jumbotron = ({ currentUser }) => {
    const [sport, setSport] = React.useState('CBB');
    const [homepage, setHomepage] = React.useState('');

    // useEffect(() => {
    //     switch (sport) {
    //         case 'CBB':
    //             // setHomepage(CBBHomePage);
    //             break;
    //         case 'NBA':
    //             // setHomepage(NBAHomepage);
    //             break;

    //         default:
    //             setHomepage('');
    //             break;
    //     }
    // }, [sport]);
};

const mapStateToProps = ({ user: { currentUser } }) => ({
    currentUser
});

export default connect(mapStateToProps)(Jumbotron);
