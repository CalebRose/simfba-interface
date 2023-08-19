import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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
    standingsMap
}) => {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectionLabel, setSelectionLabel] = useState('');
    useEffect(() => {
        if (selection) {
            const standings = standingsMap[selection.value];
            console.log({ standings, standingsMap });
            const description = `${standings.TotalWins} Wins | ${standings.TotalLosses} Losses | ${standings.ConferenceWins} Conference Wins | ${standings.ConferenceLosses} Losses`;
            setSelectionLabel(() => description);
            setSelectedTeam(() => standings.TeamName);
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
    const [rankMap, setRankMap] = useState(null);
    const [standingsMap, setStandingsMap] = useState(null);
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

    useEffect(() => {
        if (isLoading) {
            GetStandingsMap();
        }
    }, [isLoading]);

    const GetStandingsMap = async () => {
        const seasonID = isCFB ? timestamp.CollegeSeasonID : timestamp.SeasonID;
        const res = await _standingsService.GetAllConferenceStandings(seasonID);

        const sortedStandings = res.sort((a, b) =>
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

        setStandingsMap(() => teamMap);
        setTeamList(() => teamLabels);
        setIsLoading(() => false);
    };

    const SelectTeam = () => {};

    const SubmitPoll = () => {
        const DTO = {};
    };

    return (
        <ExtraLargeModal id={modalId} header={header} Submit={SubmitPoll}>
            {isLoading ? (
                <div className="mt-3">
                    <Spinner />
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-between">
                    <PollDropdown
                        label="Rank 1"
                        list={teamList}
                        selection={rankOne}
                        setSelection={setRankOne}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 2"
                        list={teamList}
                        selection={rankTwo}
                        setSelection={setRankTwo}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 3"
                        list={teamList}
                        selection={rankThree}
                        setSelection={setRankThree}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 4"
                        list={teamList}
                        selection={rankFour}
                        setSelection={setRankFour}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 5"
                        list={teamList}
                        selection={rankFive}
                        setSelection={setRankFive}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 6"
                        list={teamList}
                        selection={rankSix}
                        setSelection={setRankSix}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 7"
                        list={teamList}
                        selection={rankSeven}
                        setSelection={setRankSeven}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 8"
                        list={teamList}
                        selection={rankEight}
                        setSelection={setRankEight}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 9"
                        list={teamList}
                        selection={rankNine}
                        setSelection={setRankNine}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 10"
                        list={teamList}
                        selection={rankTen}
                        setSelection={setRankTen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 11"
                        list={teamList}
                        selection={rankEleven}
                        setSelection={setRankEleven}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 12"
                        list={teamList}
                        selection={rankTwelve}
                        setSelection={setRankTwelve}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 13"
                        list={teamList}
                        selection={rankThirteen}
                        setSelection={setRankThirteen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 14"
                        list={teamList}
                        selection={rankFourteen}
                        setSelection={setRankFourteen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 15"
                        list={teamList}
                        selection={rankFifteen}
                        setSelection={setRankFifteen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 16"
                        list={teamList}
                        selection={rankSixteen}
                        setSelection={setRankSixteen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 17"
                        list={teamList}
                        selection={rankSeventeen}
                        setSelection={setRankSeventeen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 18"
                        list={teamList}
                        selection={rankEighteen}
                        setSelection={setRankEighteen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 19"
                        list={teamList}
                        selection={rankNineteen}
                        setSelection={setRankNineteen}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 20"
                        list={teamList}
                        selection={rankTwenty}
                        setSelection={setRankTwenty}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 21"
                        list={teamList}
                        selection={rankTwentyOne}
                        setSelection={setRankTwentyOne}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 22"
                        list={teamList}
                        selection={rankTwentyTwo}
                        setSelection={setRankTwentyTwo}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 23"
                        list={teamList}
                        selection={rankTwentyThree}
                        setSelection={setRankTwentyThree}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 24"
                        list={teamList}
                        selection={rankTwentyFour}
                        setSelection={setRankTwentyFour}
                        standingsMap={standingsMap}
                    />
                    <PollDropdown
                        label="Rank 25"
                        list={teamList}
                        selection={rankTwentyFive}
                        setSelection={setRankTwentyFive}
                        standingsMap={standingsMap}
                    />
                </div>
            )}
        </ExtraLargeModal>
    );
};
