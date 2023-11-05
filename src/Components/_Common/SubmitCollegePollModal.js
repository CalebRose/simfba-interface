import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { ExtraLargeModal } from './ModalComponents';
import BBAStandingsService from '../../_Services/simNBA/BBAStandingsService';
import BBAPollService from '../../_Services/simNBA/BBAPollService';
import { Spinner } from './Spinner';
import FBATeamService from '../../_Services/simFBA/FBATeamService';
import FBAPollService from '../../_Services/simFBA/FBAPollService';

const PollDropdown = ({
    idx,
    label,
    list,
    selection,
    setSelection,
    standingsMap,
    gameMap
}) => {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectionLabel, setSelectionLabel] = useState('');
    useEffect(() => {
        if (selection) {
            const standings = standingsMap[selection.value];
            if (standings) {
                const description = `${standings.TotalWins} Wins | ${standings.TotalLosses} Losses | ${standings.ConferenceWins} Conference Wins | ${standings.ConferenceLosses} Losses`;
                setSelectionLabel(() => description);
                setSelectedTeam(() => standings.TeamName);
            }
        }
    }, [selection]);

    const ChangeSelection = (opts) => {
        setSelection(() => opts);
    };

    return (
        <div className="col-md-4 mb-2 poll-submission">
            <div className="">
                <h5 className="text-start align-middle">
                    {label}
                    {selectedTeam.length > 0 && `: ${selectedTeam}`}
                </h5>
                <h6 className="text-start align-middle">{selectionLabel}</h6>
                <Select
                    options={list}
                    className="basic-multi-select btn-dropdown-width-team"
                    classNamePrefix="select"
                    onChange={ChangeSelection}
                />
            </div>
        </div>
    );
};

export const SubmitCollegePollForm = ({ currentUser, timestamp, isCFB }) => {
    const header = `Submit College ${isCFB ? 'Football' : 'Basketball'} Poll`;
    const modalId = `submitPollModal`;
    const _standingsService = isCFB
        ? new FBATeamService()
        : new BBAStandingsService();
    const _pollService = isCFB ? new FBAPollService() : new BBAPollService();
    const [submissionID, setSubmissionID] = useState(0);
    const [gameMap, setGameMap] = useState(null);
    const [standingsMap, setStandingsMap] = useState(null);
    const [validPoll, setValidPoll] = useState(true);
    const [teamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rankOne, setRankOne] = useState(null);
    const [rankTwo, setRankTwo] = useState(null);
    const [rankThree, setRankThree] = useState(null);
    const [rankFour, setRankFour] = useState(null);
    const [rankFive, setRankFive] = useState(null);
    const [rankSix, setRankSix] = useState(null);
    const [rankSeven, setRankSeven] = useState(null);
    const [rankEight, setRankEight] = useState(null);
    const [rankNine, setRankNine] = useState(null);
    const [rankTen, setRankTen] = useState(null);
    const [rankEleven, setRankEleven] = useState(null);
    const [rankTwelve, setRankTwelve] = useState(null);
    const [rankThirteen, setRankThirteen] = useState(null);
    const [rankFourteen, setRankFourteen] = useState(null);
    const [rankFifteen, setRankFifteen] = useState(null);
    const [rankSixteen, setRankSixteen] = useState(null);
    const [rankSeventeen, setRankSeventeen] = useState(null);
    const [rankEighteen, setRankEighteen] = useState(null);
    const [rankNineteen, setRankNineteen] = useState(null);
    const [rankTwenty, setRankTwenty] = useState(null);
    const [rankTwentyOne, setRankTwentyOne] = useState(null);
    const [rankTwentyTwo, setRankTwentyTwo] = useState(null);
    const [rankTwentyThree, setRankTwentyThree] = useState(null);
    const [rankTwentyFour, setRankTwentyFour] = useState(null);
    const [rankTwentyFive, setRankTwentyFive] = useState(null);

    const ranks = [
        rankOne,
        rankTwo,
        rankThree,
        rankFour,
        rankFive,
        rankSix,
        rankSeven,
        rankEight,
        rankNine,
        rankTen,
        rankEleven,
        rankTwelve,
        rankThirteen,
        rankFourteen,
        rankFifteen,
        rankSixteen,
        rankSeventeen,
        rankEighteen,
        rankNineteen,
        rankTwenty,
        rankTwentyOne,
        rankTwentyTwo,
        rankTwentyThree,
        rankTwentyFour,
        rankTwentyFive
    ];

    const setRanks = [
        setRankOne,
        setRankTwo,
        setRankThree,
        setRankFour,
        setRankFive,
        setRankSix,
        setRankSeven,
        setRankEight,
        setRankNine,
        setRankTen,
        setRankEleven,
        setRankTwelve,
        setRankThirteen,
        setRankFourteen,
        setRankFifteen,
        setRankSixteen,
        setRankSeventeen,
        setRankEighteen,
        setRankNineteen,
        setRankTwenty,
        setRankTwentyOne,
        setRankTwentyTwo,
        setRankTwentyThree,
        setRankTwentyFour,
        setRankTwentyFive
    ];

    useEffect(() => {
        const rankMap = {};
        let valid = true;
        for (let i = 0; i < ranks.length; i++) {
            if (ranks[i] && rankMap[ranks[i].value]) {
                valid = false;
                break;
            }
            if (ranks[i]) {
                rankMap[ranks[i].value] = true;
            }
        }
        setValidPoll(() => valid);
    }, [
        rankOne,
        rankTwo,
        rankThree,
        rankFour,
        rankFive,
        rankSix,
        rankSeven,
        rankEight,
        rankNine,
        rankTen,
        rankEleven,
        rankTwelve,
        rankThirteen,
        rankFourteen,
        rankFifteen,
        rankSixteen,
        rankSeventeen,
        rankEighteen,
        rankNineteen,
        rankTwenty,
        rankTwentyOne,
        rankTwentyTwo,
        rankTwentyThree,
        rankTwentyFour,
        rankTwentyFive
    ]);

    useEffect(() => {
        if (isLoading) {
            GetPollData();
        }
    }, [isLoading]);

    const GetPollData = async () => {
        const res = await _pollService.GetSubmittedPoll(currentUser.username);
        const { Standings, Matches, Poll } = res;

        const sortedStandings = Standings.sort((a, b) =>
            a.TeamName.localeCompare(b.TeamName)
        );

        const teamLabels = sortedStandings.map((x) => {
            return { label: x.TeamName, value: x.TeamID };
        });

        const teamMap = {};
        for (let i = 0; i < sortedStandings.length; i++) {
            const stand = sortedStandings[i];
            teamMap[stand.TeamID] = stand;
        }

        const matchMap = {};

        for (let i = 0; i < Matches.length; i++) {
            const game = Matches[i];
            if (!game.GameComplete) {
                continue;
            }
            if (!matchMap[game.HomeTeamID]) {
                matchMap[game.HomeTeamID] = [game];
            } else {
                matchMap[game.HomeTeamID].push(game);
            }
            if (!matchMap[game.AwayTeamID]) {
                matchMap[game.AwayTeamID] = [game];
            } else {
                matchMap[game.AwayTeamID].push(game);
            }
        }

        for (let i = 1; i <= 25; i++) {
            const rankLabel = Poll[`Rank${i}`];
            const rankValue = Poll[`Rank${i}ID`];

            setRanks[i - 1](() => {
                return { label: rankLabel, value: rankValue };
            });
        }

        setGameMap(() => matchMap);
        setSubmissionID(() => Poll.ID);

        setStandingsMap(() => teamMap);
        setTeamList(() => teamLabels);
        setIsLoading(() => false);
    };

    const SubmitToast = () => {
        toast.promise(SubmitPoll(), {
            loading: 'Submitting poll...',
            success: 'Poll Submitted!',
            error: 'Error! Could not submit poll! Please reach to admins for assistance.'
        });
    };

    const SubmitPoll = async () => {
        const DTO = {
            ID: submissionID,
            Week: Number(timestamp.CollegeWeek) + 1,
            WeekID: Number(timestamp.CollegeWeekID) + 1,
            SeasonID: Number(timestamp.SeasonID),
            Username: currentUser.username
        };
        for (let i = 0; i < ranks.length; i++) {
            const num = i + 1;
            const rank = ranks[i];
            DTO[`Rank${num}`] = rank.label;
            DTO[`Rank${num}ID`] = rank.value;
        }
        const res = await _pollService.SubmitPoll(DTO);
        const body = await res.json();
        setSubmissionID(() => body.ID);
    };

    return (
        <ExtraLargeModal
            id={modalId}
            header={header}
            Submit={SubmitToast}
            enableSubmit={validPoll}
        >
            {isLoading ? (
                <div className="mt-3">
                    <Spinner />
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-between">
                    {ranks.map((x, idx) => {
                        const num = idx + 1;
                        return (
                            <PollDropdown
                                key={`rank-${num}`}
                                label={`Rank ${num}`}
                                list={teamList}
                                idx={idx}
                                selection={x}
                                setSelection={setRanks[idx]}
                                standingsMap={standingsMap}
                                gameMap={gameMap}
                            />
                        );
                    })}
                </div>
            )}
        </ExtraLargeModal>
    );
};
