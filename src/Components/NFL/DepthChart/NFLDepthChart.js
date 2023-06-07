import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
    SavingMessage,
    SuccessfulDepthChartSaveMessage,
    UnsuccessfulDepthChartSaveMessage
} from '../../../Constants/SystemMessages';
import { ServiceMessageBanner } from '../../_Common/ServiceMessageBanner';
import DCPositionItem from '../../DepthChart/DC_PositionItem';
import { DepthChartPositionList } from '../../DepthChart/DepthChartConstants';
import DepthChartHeader from '../../DepthChart/DepthChartHeader';
import {
    GetAvailablePlayers,
    GetPositionAttributes
} from '../../DepthChart/DepthChartHelper';
import DepthChartPlayerRow from '../../DepthChart/DepthChartPlayerRow';
import DepthChartMobilePlayerRow from '../../DepthChart/DepthChartMobilePlayerRow';
import FBADepthChartService from '../../../_Services/simFBA/FBADepthChartService';
import FBATeamService from '../../../_Services/simFBA/FBATeamService';
import FBAPlayerService from '../../../_Services/simFBA/FBAPlayerService';
import { GetTableClass } from '../../../Constants/CSSClassHelper';
import { DropdownItemObj } from '../../Roster/DropdownItem';

const NFLDepthChart = ({ currentUser, nflTeam, viewMode }) => {
    // Services
    let depthChartService = new FBADepthChartService();
    let teamService = new FBATeamService();
    let rosterService = new FBAPlayerService();

    // Hooks
    const [userTeam, setUserTeam] = React.useState('');
    const [team, setTeam] = React.useState('');
    const [teamColors, setTeamColors] = React.useState('');
    const [collegeTeams, setCollegeTeams] = React.useState('');
    const [roster, setRoster] = React.useState([]);
    const [rosterMap, setRosterMap] = React.useState(null);
    const [initialDC, setInitialDC] = React.useState([]);
    const [currentDepthChart, setCurrentDepthChart] = React.useState(null);
    const [positions, setPositions] = React.useState([]);
    const [currentPosition, setCurrentPosition] = React.useState({
        name: 'Quarterbacks',
        abbr: 'QB'
    });
    const [positionAttributes, setPositionAttributes] = React.useState([]);
    const [currentDepthChartPositions, setCurrentDepthChartPositions] =
        React.useState([]);
    const [availablePlayers, setAvailablePlayers] = React.useState([]);
    const [canModify, setCanModify] = React.useState(false);
    const [isValid, setValidation] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [serviceMessage, setServiceMessage] = React.useState('');
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:844px)` });
    const tableClass = GetTableClass(viewMode);
    // For mobile
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const handleResize = () => {
        setViewWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // UseEffects
    useEffect(() => {
        if (currentUser) {
            GetTeams();
            setPositions(() => DepthChartPositionList);
        }
    }, [currentUser]);

    useEffect(() => {
        if (nflTeam) {
            SelectTeam(nflTeam);
            setUserTeam(() => nflTeam);
        }
    }, [nflTeam]);

    useEffect(() => {
        if (currentDepthChart) {
            SetDepthChartAttributeHeaders(currentPosition);
            SetAvailablePlayersList(currentPosition);
            SetDepthChartPositionList(currentPosition);
            ValidateDepthChart();
        }
    }, [currentDepthChart, currentPosition]);

    // OnClickEvents
    const SelectTeam = async (selectedTeam) => {
        setCanModify(
            () =>
                (selectedTeam.ID === currentUser.NFLTeamID &&
                    (currentUser.NFLRole === 'Owner' ||
                        currentUser.NFLRole === 'Coach')) ||
                currentUser.roleID === 'Admin'
        );
        await GetRoster(selectedTeam.ID);
        await GetDepthChart(selectedTeam.ID);
        const colors = {
            color: '#fff',
            backgroundColor:
                selectedTeam && selectedTeam.ColorOne
                    ? selectedTeam.ColorOne
                    : '#6c757d',
            borderColor:
                selectedTeam && selectedTeam.ColorOne
                    ? selectedTeam.ColorOne
                    : '#6c757d'
        };
        setTeamColors(() => colors);
        setCurrentPosition({
            name: 'Quarterbacks',
            abbr: 'QB'
        });

        setTeam(() => selectedTeam);
    };

    const SelectUserTeam = async () => {
        await SelectTeam(userTeam);
    };

    const SelectPosition = (pos) => {
        setCurrentPosition(() => pos);
    };

    const SaveDepthChart = async () => {
        if (!isValid || !canModify) return;
        const dc = currentDepthChart.map((x) => ({
            ID: x.ID,
            DepthChartID: x.DepthChartID,
            PlayerID: x.PlayerID,
            Position: x.Position,
            PositionLevel: x.PositionLevel,
            FirstName: x.FirstName,
            LastName: x.LastName,
            OriginalPosition: x.NFLPlayer.Position
        }));
        const UpdateDepthChartDTO = {
            DepthChartID: dc[0].DepthChartID,
            UpdatedPlayerPositions: dc
        };

        // Save Call
        setServiceMessage(() => SavingMessage);

        const save = await depthChartService.SaveNFLDepthChart(
            UpdateDepthChartDTO
        );

        if (save.ok) {
            setServiceMessage(() => SuccessfulDepthChartSaveMessage);
            setTimeout(() => setServiceMessage(() => ''), 5000);
        } else {
            setServiceMessage(() => '');
            alert('HTTP-Error:', save.status);
            setErrorMessage(UnsuccessfulDepthChartSaveMessage);
            setTimeout(() => setErrorMessage(() => ''), 8000);
        }

        // Update Initial DC
        const newInitialDC = currentDepthChart.map((x) => ({ ...x }));
        setInitialDC(() => newInitialDC);
    };

    // Functions
    const SetDepthChartAttributeHeaders = (position) => {
        const { abbr, name } = position;
        let attributes = GetPositionAttributes(abbr);
        setPositionAttributes(() => attributes);
    };

    const SetAvailablePlayersList = (position) => {
        if (roster.length > 0) {
            const { abbr } = position;
            let rosterList = [...roster];
            let players = GetAvailablePlayers(abbr, rosterList);
            setAvailablePlayers(() => players);
        }
    };

    const SetDepthChartPositionList = (position) => {
        const { abbr } = position;
        const dc = [...currentDepthChart];
        if (dc.length > 0) {
            const newPositionsList = dc.filter((x) => x.Position === abbr);
            setCurrentDepthChartPositions(() => newPositionsList);
        }
    };

    const GetTeams = async () => {
        //
        let teams = await teamService.GetAllNFLTeams();
        setCollegeTeams(() => teams);
    };

    const GetRoster = async (ID) => {
        if (ID !== null || ID > 0) {
            let roster = await rosterService.GetNFLPlayersForDepthChartPage(ID);
            const newMap = {};
            for (let i = 0; i < roster.length; i++) {
                newMap[roster[i].ID] = true;
            }
            setRosterMap(() => newMap);
            setRoster(() => roster);
            let players = GetAvailablePlayers('QB', [...roster]);
            setAvailablePlayers(() => players);
        }
    };

    const GetDepthChart = async (ID) => {
        if (ID !== null || ID > 0) {
            let depthChartResponse =
                await depthChartService.GetNFLDepthChartByTeamID(ID);
            setCurrentDepthChart(() =>
                depthChartResponse.DepthChartPlayers.map((x) => ({ ...x }))
            );
            setInitialDC(() =>
                depthChartResponse.DepthChartPlayers.map((x) => ({ ...x }))
            );
        }
    };

    const ResetCurrentDepthChart = () => {
        if (!canModify) return;

        const originalDepthChart = initialDC.map((x) => ({
            ...x
        }));

        setCurrentDepthChart(() => originalDepthChart);
    };

    const SwapPlayer = (depthChartRow, newPlayer) => {
        const originalPlayer = depthChartRow.NFLPlayer;
        const dc = [...currentDepthChart];
        // Check if the new player is existing in the position depth chart
        const originalPlayerRowIndex = dc.findIndex(
            (x) => x.ID === depthChartRow.ID
        );

        const existingOnDepthChartIndex = dc.findIndex(
            (x) =>
                x.Position === depthChartRow.Position &&
                x.PlayerID === newPlayer.PlayerID
        );

        if (existingOnDepthChartIndex > 0) {
            // If the player does exist in a different level on the depth chart, conduct a swap
            const newPlayerRow = dc[existingOnDepthChartIndex];

            // Swap the first name, last name, player ID, and NFLPlayer Records between both
            const temp = {
                PlayerID: newPlayerRow.PlayerID,
                FirstName: newPlayerRow.FirstName,
                LastName: newPlayerRow.LastName,
                OriginalPosition: newPlayer.Position,
                NFLPlayer: newPlayer
            };

            dc[existingOnDepthChartIndex].PlayerID =
                dc[originalPlayerRowIndex].PlayerID;
            dc[existingOnDepthChartIndex].FirstName =
                dc[originalPlayerRowIndex].FirstName;
            dc[existingOnDepthChartIndex].LastName =
                dc[originalPlayerRowIndex].LastName;
            dc[existingOnDepthChartIndex].OriginalPosition =
                originalPlayer.Position;
            dc[existingOnDepthChartIndex].NFLPlayer = originalPlayer;

            dc[originalPlayerRowIndex].PlayerID = temp.PlayerID;
            dc[originalPlayerRowIndex].FirstName = temp.FirstName;
            dc[originalPlayerRowIndex].LastName = temp.LastName;
            dc[originalPlayerRowIndex].OriginalPosition = temp.OriginalPosition;
            dc[originalPlayerRowIndex].NFLPlayer = temp.NFLPlayer;
        } else {
            // If the player does not exist yet on the depth chart...
            dc[originalPlayerRowIndex].PlayerID = newPlayer.PlayerID;
            dc[originalPlayerRowIndex].FirstName = newPlayer.FirstName;
            dc[originalPlayerRowIndex].LastName = newPlayer.LastName;
            dc[originalPlayerRowIndex].OriginalPosition = newPlayer.Position;
            dc[originalPlayerRowIndex].NFLPlayer = newPlayer;
        }
        setCurrentDepthChart(() => dc);
    };

    const ValidateDepthChart = () => {
        if (!canModify) {
            setServiceMessage(
                () => "Viewing other team's depth charts in read-only mode."
            );
            return;
        }

        let validStatus = true;

        const dc = [...currentDepthChart];
        let DepthChartMap = {};
        // It is not possible to have duplicate records under the same position
        for (let i = 0; i < dc.length; i++) {
            let row = dc[i];
            if (!rosterMap[row.PlayerID]) {
                setValidation(() => false);
                setErrorMessage(
                    `${row.FirstName} ${row.LastName} is listed on the depth chart at position ${row.Position}, but is not part of the roster. They are unable to play for ${team.TeamName}. Please remove them from the depth chart.`
                );
                return;
            }

            if (row.NFLPlayer.IsPracticeSquad) {
                setValidation(() => false);
                setErrorMessage(
                    `${row.FirstName} ${row.LastName} is on the practice squad but is listed in the depth chart. Please swap them from their ${row.Position} position level.`
                );
                return;
            }

            if (row.NFLPlayer.IsInjured) {
                setValidation(() => false);
                setErrorMessage(
                    `${row.FirstName} ${row.LastName} is injured with ${row.NFLPlayer.InjuryType}. They are unable to play for ${row.NFLPlayer.WeeksOfRecovery} Weeks. Please swap them from their ${row.Position} position level.`
                );
                return;
            }
            const pos = row.Position;
            let NameKey = row.FirstName + row.LastName + row.PlayerID;
            let isSpecialTeamsPosition =
                pos === 'P' ||
                pos === 'K' ||
                pos === 'PR' ||
                pos === 'KR' ||
                pos === 'FG' ||
                pos === 'STU';

            if (!DepthChartMap[NameKey]) {
                DepthChartMap[NameKey] = {};
            }

            if (!isSpecialTeamsPosition) {
                DepthChartMap[NameKey][pos] = row.PositionLevel;
                let FirstStringCount = 0;
                for (var key in DepthChartMap[NameKey]) {
                    if (DepthChartMap[NameKey][key] === '1') {
                        FirstStringCount++;
                    }
                    if (FirstStringCount > 1) {
                        validStatus = false;
                        break;
                    }
                }

                if (!validStatus) {
                    setValidation(() => validStatus);
                    let isLinemenPosition =
                        pos === 'LT' ||
                        pos === 'LG' ||
                        pos === 'C' ||
                        pos === 'RG' ||
                        pos === 'RT';

                    if (isLinemenPosition) {
                        setErrorMessage(
                            () =>
                                `You have an offensive linemen set at First String for two OLine Positions. Please resolve this issue`
                        );
                        return;
                    }
                    let isDlinePosition =
                        pos === 'DT' || pos === 'LE' || pos === 'RE';

                    if (isDlinePosition) {
                        setErrorMessage(
                            () =>
                                `You have a defensive linemen set at First String for two DLine Positions. Please resolve this issue`
                        );
                        return;
                    }

                    let isLinebackerPosition =
                        pos === 'LOLB' || pos === 'OLB' || pos === 'MLB';

                    if (isLinebackerPosition) {
                        setErrorMessage(
                            () =>
                                `You have a linebacker set at First String for Linebacker positions. Please resolve this issue`
                        );
                        return;
                    }

                    let isSecondaryPosition =
                        pos === 'CB' || pos === 'FS' || pos === 'SS';

                    if (isSecondaryPosition)
                        setErrorMessage(
                            () =>
                                `You have a defensive back set at First String for two DB Positions. Please resolve this issue`
                        );
                    return;
                }
            }
        }
        setServiceMessage(() => '');
        setErrorMessage(() => '');
        setValidation(() => validStatus);
    };

    return (
        <div className="container-fluid mt-3 cfb-depthchart-container">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-11 px-md-4">
                    <div className="row">
                        <div className="col-md-auto justify-content-start">
                            <h2>
                                {team ? team.TeamName + ' ' : ''}Depth Chart
                            </h2>
                        </div>
                        <div className="col-md-auto ms-auto">
                            {canModify ? (
                                <button
                                    className="btn btn-danger me-2"
                                    onClick={ResetCurrentDepthChart}
                                >
                                    Reset Depth Chart
                                </button>
                            ) : (
                                ''
                            )}
                            {isValid && canModify ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={SaveDepthChart}
                                >
                                    Save Depth Chart
                                </button>
                            ) : (
                                <button className="btn btn-secondary" disabled>
                                    Save Depth Chart
                                </button>
                            )}
                        </div>
                        {!isMobile ? (
                            <ServiceMessageBanner
                                serMessage={serviceMessage}
                                errMessage={errorMessage}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
                            <div className="drop-start btn-dropdown-width-team mt-1 mb-1">
                                <button
                                    name="team"
                                    className="btn dropdown-toggle btn-dropdown-width-team"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
                                >
                                    <span>{team ? team.TeamName : ''}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-content">
                                    <DropdownItemObj
                                        value={
                                            currentUser
                                                ? currentUser.NFLTeam
                                                : null
                                        }
                                        click={SelectUserTeam}
                                        id={
                                            currentUser
                                                ? currentUser.NFLTeamID
                                                : null
                                        }
                                    />
                                    <hr className="dropdown-divider"></hr>
                                    {collegeTeams && collegeTeams.length > 0
                                        ? collegeTeams.map((x) => (
                                              <DropdownItemObj
                                                  key={x.ID}
                                                  value={
                                                      x.TeamName +
                                                      ' ' +
                                                      x.Mascot
                                                  }
                                                  team={x}
                                                  id={x.ID}
                                                  click={SelectTeam}
                                              />
                                          ))
                                        : ''}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <div className="drop-start btn-dropdown-width-team mt-1 mb-1">
                                <button
                                    name="position"
                                    className="btn dropdown-toggle btn-dropdown-width-team"
                                    id="dropdownMenuButton2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={teamColors ? teamColors : {}}
                                >
                                    <span>
                                        {currentPosition
                                            ? currentPosition.name +
                                              ' | ' +
                                              currentPosition.abbr
                                            : ''}
                                    </span>
                                </button>
                                <ul className="dropdown-menu dropdown-content">
                                    <DCPositionItem
                                        position={
                                            currentPosition
                                                ? currentPosition
                                                : ''
                                        }
                                        id={0}
                                        click={SelectPosition}
                                    />
                                    <hr className="dropdown-divider"></hr>
                                    {positions && positions.length > 0
                                        ? positions.map((x, idx) => (
                                              <DCPositionItem
                                                  key={idx}
                                                  position={x}
                                                  id={idx}
                                                  click={SelectPosition}
                                              />
                                          ))
                                        : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row depth-chart-table mt-1 mb-5">
                        {isMobile ? (
                            <>
                                {currentDepthChartPositions &&
                                    currentDepthChartPositions.length > 0 &&
                                    currentDepthChartPositions.map((x, idx) => {
                                        return (
                                            <DepthChartMobilePlayerRow
                                                canModify={canModify}
                                                key={idx}
                                                player={x}
                                                availablePlayers={
                                                    availablePlayers
                                                }
                                                positionAttributes={
                                                    positionAttributes
                                                }
                                                swapPlayer={SwapPlayer}
                                                isCFB={false}
                                            />
                                        );
                                    })}
                            </>
                        ) : (
                            <table className={tableClass}>
                                <thead>
                                    <tr>
                                        {positionAttributes &&
                                            positionAttributes.length > 0 &&
                                            positionAttributes.map((x, idx) => {
                                                return (
                                                    <DepthChartHeader
                                                        key={idx}
                                                        idx={idx}
                                                        label={x.label}
                                                        abbr={x.abbr}
                                                        isMobile={isMobile}
                                                    />
                                                );
                                            })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDepthChartPositions &&
                                        currentDepthChartPositions.length > 0 &&
                                        currentDepthChartPositions.map(
                                            (x, idx) => {
                                                return (
                                                    <DepthChartPlayerRow
                                                        canModify={canModify}
                                                        key={idx}
                                                        player={x}
                                                        availablePlayers={
                                                            availablePlayers
                                                        }
                                                        positionAttributes={
                                                            positionAttributes
                                                        }
                                                        swapPlayer={SwapPlayer}
                                                        isCFB={false}
                                                    />
                                                );
                                            }
                                        )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    nflTeam: { nflTeam },
    viewMode: { viewMode }
}) => ({
    currentUser,
    nflTeam,
    viewMode
});

export default connect(mapStateToProps)(NFLDepthChart);
