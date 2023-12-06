import React from 'react';
import { CancelOfferModal } from '../../../NFL/FreeAgency/CancelOfferModal';
import { CheckForOffer } from '../../../NFL/FreeAgency/FreeAgencyHelper';
import {
    NBAFreeAgencyPlayerModal,
    NBAFreeAgentOfferModal,
    NBAWaiverOfferModal
} from './NBAFreeAgencyModals';
import { getLogo } from '../../../../Constants/getLogo';

export const NBAFreeAgencyMobileRow = ({}) => {};

export const NBAFreeAgencyRow = ({
    teamID,
    player,
    idx,
    viewMode,
    canModify,
    extend,
    cancel,
    ts,
    team,
    rosterCount,
    freeAgencyView
}) => {
    const {
        ID,
        FirstName,
        LastName,
        IsNegotiating,
        IsAcceptingOffers,
        Position
    } = player;
    const rank = idx + 1;
    const NameLabel = `${Position} ${FirstName} ${LastName}`;
    const modalTarget = '#playerModal' + idx;
    const offerTarget = '#offerModal' + idx;
    const waiverTarget = `#waiverModal${idx}`;
    const cancelTarget = '#cancelOffer' + idx;
    const hasOffer = CheckForOffer(player, teamID);
    const viewFA = freeAgencyView === 'FA';
    const viewGL = freeAgencyView === 'GL';
    const viewWW = freeAgencyView === 'WW';
    const viewINT = freeAgencyView === 'INT';
    const leadingTeamsMapper = (player) => {
        if (
            (viewFA &&
                (player.Offers === null || player.Offers.length === 0)) ||
            (!viewFA &&
                (player.WaiverOffers === null ||
                    player.WaiverOffers.length === 0))
        ) {
            return 'None';
        }

        const offers = viewFA ? player.Offers : player.WaiverOffers;

        return offers.map((x) => {
            const logo = getLogo(x.Team, currentUser.IsRetro);
            return (
                <>
                    <img
                        className="image-nfl-fa mx-1"
                        src={logo}
                        alt="competing-team"
                    />
                </>
            );
        });
    };
    const leadingTeams = leadingTeamsMapper(player);

    const StatusLabel = IsAcceptingOffers ? 'Open' : 'Negotiating';

    const canMakeOffer =
        canModify &&
        (ts.IsOffseason ||
            ts.NBAPreseason ||
            (!ts.IsNBAOffSeason && !ts.NBAPreseason && rosterCount < 18)) &&
        (!IsNegotiating || (IsNegotiating && hasOffer));

    return (
        <>
            <NBAFreeAgencyPlayerModal
                key={player.ID}
                player={player}
                idx={idx}
                viewMode={viewMode}
            />
            {viewFA ? (
                <NBAFreeAgentOfferModal
                    key={player.ID}
                    team={team}
                    player={player}
                    idx={idx}
                    ts={ts}
                    extend={extend}
                    viewMode={viewMode}
                />
            ) : (
                <NBAWaiverOfferModal
                    key={player.ID}
                    team={team}
                    player={player}
                    idx={idx}
                    ts={ts}
                    extend={extend}
                    viewMode={viewMode}
                />
            )}

            <CancelOfferModal
                key={player.ID}
                player={player}
                idx={idx}
                cancel={cancel}
                teamID={team.ID}
                viewMode={viewMode}
                viewFA={viewFA}
            />
            <tr style={{ backgroundColor: 'white', zIndex: -1 }}>
                <th scope="row">
                    <h4>{rank}</h4>
                    <button
                        type="button"
                        className="btn btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target={modalTarget}
                    >
                        <i
                            className={`bi bi-info-circle ${
                                viewMode === 'dark' ? 'text-light' : ''
                            }`}
                        />
                    </button>
                </th>
                <td className="align-middle" style={{ width: 175 }}>
                    <h6>{NameLabel}</h6>
                </td>
                <td className="align-middle" style={{ width: 175 }}>
                    <h6>{player.Archetype}</h6>
                </td>
                <td className="align-middle">
                    <h6>
                        {player.Age} | {player.Year}
                    </h6>
                </td>
                <td className="align-middle">
                    <h6>{player.Overall}</h6>
                </td>
                <td className="align-middle">
                    <h6>{player.PotentialGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{player.PreviousTeam}</h6>
                </td>
                <td className="align-middle">
                    <h6>{StatusLabel}</h6>
                </td>
                <td className="align-middle">
                    <h6>${player.MinimumValue}M</h6>
                </td>
                <td className="align-middle">
                    <h6>{leadingTeams}</h6>
                </td>
                <td className="align-middle">
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn"
                            title="Make An Offer"
                            data-bs-toggle="modal"
                            data-bs-target={viewFA ? offerTarget : waiverTarget}
                            disabled={
                                !canMakeOffer ||
                                (player.IsInternational && !player.IsNBA)
                            }
                        >
                            <i className="bi bi-cash-coin image-nfl-roster" />
                        </button>
                        <button
                            type="button"
                            className="btn"
                            title="Cancel Existing Offer"
                            data-bs-toggle="modal"
                            data-bs-target={cancelTarget}
                            disabled={!hasOffer || !canModify}
                        >
                            <i class="bi bi-x-circle image-nfl-roster" />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};
