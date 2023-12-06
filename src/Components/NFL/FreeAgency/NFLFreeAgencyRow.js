import React from 'react';
import { getLogo } from '../../../Constants/getLogo';
import { CancelOfferModal } from './CancelOfferModal';
import { CheckForOffer } from './FreeAgencyHelper';
import { FreeAgencyPlayerModal } from './FreeAgencyPlayerModal';
import { FreeAgentOfferModal, WaiverOfferModal } from './FreeAgentOfferModal';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';

const NFLFreeAgencyRow = ({
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
    freeAgencyView,
    retro
}) => {
    const rank = idx + 1;
    const {
        ID,
        FirstName,
        LastName,
        Position,
        Archetype,
        Overall,
        ShowLetterGrade,
        Age,
        Experience,
        PotentialGrade,
        PreviousTeam,
        IsAcceptingOffers,
        IsNegotiating,
        MinimumValue
    } = player;
    const NameLabel = `${FirstName} ${LastName}`;
    const modalTarget = `#playerModal${idx}`;
    const offerTarget = `#offerModal${idx}`;
    const waiverTarget = `#waiverModal${idx}`;
    const cancelTarget = `#cancelOffer${idx}`;
    const viewFA = freeAgencyView === 'FA';
    const viewPS = freeAgencyView === 'PS';
    const viewWW = freeAgencyView === 'WW';
    let ovr = GetNFLOverall(Overall, ShowLetterGrade);
    const hasOffer = CheckForOffer(player, teamID);

    const leadingTeamsMapper = (player) => {
        if (
            ((viewFA || viewPS) &&
                (player.Offers === null || player.Offers.length === 0)) ||
            (!viewFA &&
                !viewPS &&
                (player.WaiverOffers === null ||
                    player.WaiverOffers.length === 0))
        ) {
            return 'None';
        }

        const offers = viewFA || viewPS ? player.Offers : player.WaiverOffers;

        return offers.map((x, index) => {
            const logo = getLogo(x.Team, retro);
            return (
                <img
                    key={index}
                    className="image-nfl-fa mx-1"
                    src={logo}
                    alt="competing-team"
                />
            );
        });
    };
    const leadingTeams = leadingTeamsMapper(player);

    const StatusLabel = IsAcceptingOffers ? 'Open' : 'Negotiating';

    const canMakeOffer =
        canModify &&
        (ts.IsOffseason ||
            ts.NFLPreseason ||
            (!ts.IsNFLOffSeason && !ts.NFLPreseason && rosterCount < 56)) &&
        (!IsNegotiating || (IsNegotiating && hasOffer));

    const makeOfferButton = (
        <button
            type="button"
            className="btn"
            title="Make An Offer"
            data-bs-toggle="modal"
            data-bs-target={viewFA || viewPS ? offerTarget : waiverTarget}
            disabled={!canMakeOffer}
        >
            <i className="bi bi-cash-coin image-nfl-roster" />
        </button>
    );

    const cancelOfferButton = (
        <button
            type="button"
            className="btn"
            title="Cancel Existing Offer"
            data-bs-toggle="modal"
            data-bs-target={cancelTarget}
            disabled={!hasOffer || !canModify}
        >
            <i className="bi bi-x-circle image-nfl-roster" />
        </button>
    );

    return (
        <>
            <FreeAgencyPlayerModal
                key={ID}
                player={player}
                idx={idx}
                viewMode={viewMode}
                retro={retro}
            />
            {viewFA || viewPS ? (
                <FreeAgentOfferModal
                    key={ID}
                    team={team}
                    player={player}
                    idx={idx}
                    ts={ts}
                    extend={extend}
                    viewMode={viewMode}
                    viewPS={viewPS}
                />
            ) : (
                <WaiverOfferModal
                    key={ID}
                    team={team}
                    player={player}
                    idx={idx}
                    ts={ts}
                    extend={extend}
                    viewMode={viewMode}
                />
            )}

            <CancelOfferModal
                key={ID}
                player={player}
                idx={idx}
                cancel={cancel}
                teamID={team.ID}
                viewMode={viewMode}
                viewFA={viewFA}
                viewPS={viewPS}
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
                <td className="align-middle">
                    <h6>{Position}</h6>
                </td>
                <td className="align-middle" style={{ width: 175 }}>
                    <h6>{Archetype}</h6>
                </td>
                <td className="align-middle">
                    <h6>
                        {Age} | {Experience}
                    </h6>
                </td>
                <td className="align-middle">
                    <h6>{ovr}</h6>
                </td>
                <td className="align-middle">
                    <h6>{PotentialGrade}</h6>
                </td>
                <td className="align-middle">
                    <h6>{PreviousTeam}</h6>
                </td>
                <td className="align-middle">
                    <h6>{StatusLabel}</h6>
                </td>
                <td className="align-middle">
                    <h6>{RoundToTwoDecimals(MinimumValue)}</h6>
                </td>
                <td className="align-middle">
                    <h6>{leadingTeams}</h6>
                </td>
                <td className="align-middle">
                    <div className="btn-group">
                        {makeOfferButton}
                        {cancelOfferButton}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default NFLFreeAgencyRow;
