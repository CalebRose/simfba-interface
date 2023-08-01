import React from 'react';
import FBAPlayerService from '../../../_Services/simFBA/FBAPlayerService';
import { useState } from 'react';
import { StatsPageButton } from '../../_Common/Buttons';
import { getLogo } from '../../../Constants/getLogo';
import { useEffect } from 'react';
import { ExtraLargeModal } from '../../_Common/ModalComponents';
import { Spinner } from '../../_Common/Spinner';

export const InjuryReportModal = () => {
    const _playerService = new FBAPlayerService();
    const id = `injuryReportModal`;
    const header = 'Injury Report Modal';
    const [league, setLeague] = useState('cfb');
    const [viewablePlayers, setViewablePlayers] = useState(null);
    const [injuredCollegePlayers, setInjuredCollegePlayers] = useState(null);
    const [injuredNFLPlayers, setInjuredNFLPlayers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            GetInjuryData();
        }
    }, [isLoading]);

    const GetInjuryData = async () => {
        const res = await _playerService.GetInjuryData();
        if (res) {
            setInjuredCollegePlayers(() => res.CollegePlayers);
            setInjuredNFLPlayers(() => res.NFLPlayers);
            setViewablePlayers(() => res.CollegePlayers);
            setIsLoading(() => false);
        }
    };

    const SelectLeague = (event) => {
        const { value } = event.target;
        setViewablePlayers(() => []);
        setLeague(() => value);
        if (value === 'cfb') {
            setViewablePlayers(() => injuredCollegePlayers);
        } else {
            setViewablePlayers(() => injuredNFLPlayers);
        }
    };
    // Show attributes
    // Get season stats
    // Team History
    // Team Standings?

    return (
        <ExtraLargeModal id={id} header={header}>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className="row">
                        <div
                            className="btn-group btn-group-lg"
                            role="group"
                            aria-label="ViewOptions"
                        >
                            <StatsPageButton
                                statType={league}
                                action={SelectLeague}
                                value="cfb"
                                label="College"
                            />
                            <StatsPageButton
                                statType={league}
                                action={SelectLeague}
                                value="nfl"
                                label="NFL"
                            />
                        </div>
                    </div>
                    <div className="row mt-1 mb-2">
                        <div className="col-3">
                            <h6>Team</h6>
                        </div>
                        <div className="col-3">
                            <h6>Name</h6>
                        </div>
                        <div className="col-3">
                            <h6>Injury</h6>
                        </div>
                        <div className="col-3">
                            <h6>Weeks of Recovery</h6>
                        </div>
                    </div>

                    {viewablePlayers &&
                        viewablePlayers.map((x) => {
                            const logo = getLogo(x.TeamAbbr);
                            return (
                                <div className="row mt-2">
                                    <div className="col-3">
                                        <img
                                            src={logo}
                                            className="image-college-team"
                                        />
                                    </div>
                                    <div className="col-3">
                                        {x.Position} {x.FirstName} {x.LastName}
                                    </div>
                                    <div className="col-3">{x.InjuryType}</div>
                                    <div className="col-3">
                                        {x.WeeksOfRecovery}
                                    </div>
                                </div>
                            );
                        })}
                </>
            )}
        </ExtraLargeModal>
    );
};
