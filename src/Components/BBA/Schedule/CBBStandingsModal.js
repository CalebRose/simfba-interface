import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import BBAStandingsService from '../../../_Services/simNBA/BBAStandingsService';
import StandingsCard from './StandingsModalCard';

const CBBStandingsModal = (props) => {
    let _standingsService = new BBAStandingsService();
    const modalId = `standingsModal`;
    const { ts } = props;
    const [conferences, setConferences] = useState([]);
    const [allStandings, setAllStandings] = useState([]);
    const [viewableStandings, setViewableStandings] = useState([]);
    const [selectedConferences, setSelectedConferences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (ts !== undefined || ts !== null) {
            GetAllStandingsData();
        }
    }, [ts]);

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
        console.log({ ts });
        let response = await _standingsService.GetAllConferenceStandings(
            ts.SeasonID
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
                stack.push(curr);
                curr = [];
                curr.push(response[i]);
            }
        }

        setAllStandings(() => stack);
        setViewableStandings(() => stack);
        console.log({ filtered, stack });
        setIsLoading(() => false);
    };

    const ChangeConferences = (options) => {
        const opts = [...options.map((x) => x.value)];
        setSelectedConferences(() => opts);
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
                                ? `${ts.Season} SimCBB Conference Standings`
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
                                        <StandingsCard standings={x} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="row justify-content-center pt-2 mt-4 mb-2">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CBBStandingsModal;
