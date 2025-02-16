import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import BBAStandingsService from '../../../_Services/simNBA/BBAStandingsService';
import { Spinner } from '../../_Common/Spinner';
import StandingsCard from './StandingsModalCard';
import { NBAStandingsCard } from '../../_Common/NBAStandingsCard';
import {
    SeasonsList,
    SimCBB,
    SimNBA
} from '../../../Constants/CommonConstants';

const CBBStandingsModal = (props) => {
    let _standingsService = new BBAStandingsService();
    const modalId = `standingsModal`;
    const { ts, isNBA, retro } = props;
    const [conferences, setConferences] = useState([]);
    const [seasons, setSeasons] = useState(SeasonsList);
    const [allStandings, setAllStandings] = useState([]);
    const [viewableStandings, setViewableStandings] = useState([]);
    const [selectedConferences, setSelectedConferences] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (ts !== undefined || ts !== null) {
            if (selectedSeason === null) {
                const year = {
                    label: ts.Season,
                    value: ts.SeasonID
                };
                setSelectedSeason(() => year);
            } else {
                setIsLoading(() => true);
                GetAllStandingsData();
            }
        }
    }, [ts, selectedSeason, isNBA]);

    useEffect(() => {
        let fcs = [...allStandings];
        if (selectedConferences.length > 0) {
            fcs = fcs.filter((x) =>
                selectedConferences.includes(x[0].ConferenceID)
            );
        }
        setViewableStandings(() => fcs);
    }, [selectedConferences]);

    const GetAllStandingsData = async () => {
        let response = !isNBA
            ? await _standingsService.GetAllConferenceStandings(
                  selectedSeason.value
              )
            : await _standingsService.GetAllNBAConferenceStandings(
                  selectedSeason.value
              );
        let confs = response.map((x) => {
            return { label: x.ConferenceName, value: x.ConferenceID };
        });
        const filtered = _.uniqBy(confs, 'value');

        setConferences(() => filtered);
        const stack = [];
        let currentID = 1;
        let curr = [];

        // Stack is a list of standings arrays.
        // This loop goes through the response and puts each standings into an
        // array based on its conference ID
        for (let i = 0; i < response.length; i++) {
            if (response[i].ConferenceID === currentID) {
                curr.push(response[i]);
            } else {
                currentID++;
                while (response[i].ConferenceID !== currentID) currentID++;
                stack.push(curr);
                curr = [];
                curr.push(response[i]);
            }
        }
        if (curr.length > 0) {
            stack.push(curr);
        }

        setAllStandings(() => stack);
        setViewableStandings(() => stack);
        setIsLoading(() => false);
    };

    const ChangeConferences = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedConferences(() => opts);
    };

    const ChangeSeason = (options) => {
        const opts = { label: options.label, value: options.value };
        setSelectedSeason(() => opts);
    };

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby="standingsModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="crootModalLabel">
                            {!isLoading
                                ? `${
                                      selectedSeason !== undefined &&
                                      selectedSeason !== null
                                          ? selectedSeason.label
                                          : 0
                                  } SimCBB Conference Standings`
                                : ''}
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {!isLoading ? (
                            <>
                                <div className="row g-2 gy-2 mb-2">
                                    <div className="col-md-auto">
                                        <h5 className="text-start align-middle">
                                            Conferences
                                        </h5>
                                        <Select
                                            options={conferences}
                                            isMulti={true}
                                            className="basic-multi-select btn-dropdown-width-team z-index-6"
                                            classNamePrefix="select"
                                            onChange={ChangeConferences}
                                        />
                                    </div>
                                    <div className="col-md-auto">
                                        <h5 className="text-start align-middle">
                                            Seasons
                                        </h5>
                                        <Select
                                            options={seasons}
                                            isMulti={false}
                                            className="basic-multi-select btn-dropdown-width-team z-index-6"
                                            classNamePrefix="select"
                                            onChange={ChangeSeason}
                                        />
                                    </div>
                                    <div className="col-md-auto ms-2">
                                        <i>
                                            C.W.: Conference Wins | C.L.:
                                            Conference Losses | T.W.: Total Wins
                                            | T.L.: Total Losses
                                        </i>
                                    </div>
                                </div>
                                <div className="row g-2 gy-2 mb-1">
                                    {viewableStandings.map((x) => (
                                        <NBAStandingsCard
                                            standings={x}
                                            retro={retro}
                                            league={isNBA ? SimNBA : SimCBB}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="row justify-content-center pt-2 mt-4 mb-2">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CBBStandingsModal;
