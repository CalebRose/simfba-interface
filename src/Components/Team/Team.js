import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLogo } from '../../Constants/getLogo';
import routes from '../../Constants/routes';
import FBATeamService from '../../_Services/simFBA/FBATeamService';

const Team = ({ currentUser, cfbTeam, cfb_Timestamp }) => {
    let _teamService = new FBATeamService();
    const [team, setTeam] = React.useState(null); // Redux value as initial value for react hook
    const [teamColors, setTeamColors] = React.useState('');
    const [logo, setLogo] = React.useState([]);
    const [records, setHistoricRecords] = React.useState(null);
    const [overallWins, setOverallWins] = React.useState(0);
    const [overallLosses, setOverallLosses] = React.useState(0);
    const [currentSeasonWins, setCurrentSeasonWins] = React.useState(0);
    const [currentSeasonLosses, setCurrentSeasonLosses] = React.useState(0);
    const [bowlWins, setBowlWins] = React.useState(0);
    const [bowlLosses, setBowlLosses] = React.useState(0);
    const [conferenceChampionships, setConferenceChampionships] =
        React.useState(null);
    const [divisionTitles, setDivisionTitles] = React.useState(null);
    const [nationalChampionships, setNationalChampionships] =
        React.useState(null);

    useEffect(() => {
        if (currentUser) {
            setLogo(getLogo(currentUser.teamAbbr, currentUser.IsRetro));
        }
    }, [currentUser]);

    useEffect(() => {
        if (cfbTeam) {
            setTeam(cfbTeam);
            const colors = {
                color: '#fff',
                backgroundColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d',
                borderColor:
                    cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d'
            };
            setTeamColors(colors);
            GetHistoricalStandings();
        }
    }, [cfbTeam]);

    useEffect(() => {
        if (records !== null) {
            setOverallWins(() => records.OverallWins);
            setOverallLosses(() => records.OverallLosses);
            setCurrentSeasonWins(() => records.CurrentSeasonWins);
            setCurrentSeasonLosses(() => records.CurrentSeasonLosses);
            setBowlWins(() => records.BowlWins);
            setBowlLosses(() => records.BowlLosses);

            if (records.ConferenceChampionships !== null) {
                const confChamps = records.ConferenceChampionships.join(', ');
                setConferenceChampionships(() => confChamps);
            }

            if (records.DivisionTitles != null) {
                const divTitles = records.DivisionTitles.join(', ');
                setDivisionTitles(() => divTitles);
            }

            if (records.NationalChampionships !== null) {
                const natChamps =
                    records.NationalChampionships &&
                    records.NationalChampionships.join(', ');
            }
        }
    }, [records]);

    const GetHistoricalStandings = async () => {
        const res = await _teamService.GetHistoricalTeamStandingsByTeamID(
            cfbTeam.ID
        );

        setHistoricRecords(() => res);
    };

    return (
        <div className="container userInterface">
            <div className="row">
                <div className="col-md-auto">
                    <h2 className="title is-3">
                        {currentUser
                            ? `${currentUser.team} ${currentUser.mascot}`
                            : ''}
                    </h2>
                </div>
            </div>
            <div className="row mt-2 text-start">
                <div className="col-md-auto">
                    <div className="image me-2">
                        <img src={logo} alt="Team Logo" />
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <h2>Coach</h2>
                    </div>
                    <p>
                        <strong>Coach:</strong>{' '}
                        {currentUser ? currentUser.username : ''}
                    </p>
                    <p>
                        <strong>Overall:</strong>{' '}
                        {`${overallWins} - ${overallLosses}`}
                    </p>
                    <p>
                        <strong>Current Season:</strong>{' '}
                        {`${currentSeasonWins} - ${currentSeasonLosses}`}
                    </p>
                    <p>
                        <strong>Bowl Record:</strong>{' '}
                        {`${bowlWins} - ${bowlLosses}`}
                    </p>
                </div>
                <div className="col-md-auto">
                    <div>
                        <h2>School</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
                            <p>
                                <strong>Location:</strong>{' '}
                                {team ? team.City : ''},{' '}
                                {team ? team.State : ''}
                            </p>
                            <p>
                                <strong>Enrollment:</strong>{' '}
                                {team
                                    ? team.Enrollment.toLocaleString()
                                    : 'N / A'}
                            </p>
                            <p>
                                <strong>Stadium:</strong>{' '}
                                {team ? team.Stadium : 'N / A'}
                            </p>
                            <p>
                                <strong>Avg Attendance:</strong>{' '}
                                {team
                                    ? team.StadiumCapacity.toLocaleString()
                                    : 'N / A'}
                            </p>
                        </div>
                        <div className="col-md-auto">
                            <p>
                                <strong>Conference: </strong>
                                {team ? team.Conference : 'N / A'}
                            </p>
                            <p>
                                <strong>Division:</strong>{' '}
                                {team && team.DivisionID > 0
                                    ? team.Division
                                    : 'N / A'}
                            </p>
                            <p>
                                <strong>Conference Championships:</strong>{' '}
                                {conferenceChampionships === null
                                    ? 'N / A'
                                    : conferenceChampionships}
                            </p>
                            <p>
                                <strong>Division Titles:</strong>{' '}
                                {divisionTitles === null
                                    ? 'N / A'
                                    : divisionTitles}
                            </p>
                            <p>
                                <strong>National Championships:</strong>{' '}
                                {nationalChampionships === null
                                    ? 'N / A'
                                    : nationalChampionships}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="btn-group">
                    <Link
                        to={routes.CFB_GAMEPLAN}
                        role="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Gameplan
                    </Link>

                    <Link
                        to={routes.DEPTHCHART}
                        role="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Depth Chart
                    </Link>
                    <Link
                        to={routes.CFB_TEAM_RECRUITING_BOARD}
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Recruiting Board
                    </Link>
                    <button
                        type="button"
                        class="btn btn-primary btn-md me-2 shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Stats
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary btn-md shadow"
                        style={teamColors ? teamColors : {}}
                    >
                        Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    cfbTeam: { cfbTeam },
    timestamp: { cfb_Timestamp }
}) => ({
    currentUser,
    cfbTeam,
    cfb_Timestamp
});

export default connect(mapStateToProps)(Team);
