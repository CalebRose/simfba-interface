import React from 'react';
import { getLogo } from '../../../Constants/getLogo';
import { baseUrl } from '../../../Constants/logos';
import { CancelOfferModal } from './CancelOfferModal';
import { FreeAgencyPlayerModal } from './FreeAgencyPlayerModal';
import { FreeAgentOfferModal } from './FreeAgentOfferModal';

const NFLFreeAgencyRow = ({
    teamID,
    player,
    idx,
    viewMode,
    canModify,
    extend,
    cancel,
    ts,
    team
}) => {
    const rank = idx + 1;
    const NameLabel = player.FirstName + ' ' + player.LastName;
    const modalTarget = '#playerModal' + idx;
    const offerTarget = '#offerModal' + idx;
    const cancelTarget = '#cancelOffer' + idx;
    const checkForOffer = (player) => {
        if (player.Offers.length > 0) {
            const offerIdx = player.Offers.findIndex(
                (x) => x.TeamID === teamID
            );
            if (offerIdx > -1) {
                return true;
            }
        }
        return false;
    };

    const hasOffer = checkForOffer(player);

    const leadingTeamsMapper = (player) => {
        if (player.Offers === null || player.Offers.length === 0) {
            return 'None';
        }

        return player.Offers.map((x) => {
            const logo = getLogo(x.Team);
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

    const StatusLabel = player.IsAcceptingOffers ? 'Open' : 'Negotiating';

    const canMakeOffer =
        canModify &&
        (!player.IsNegotiating || (player.IsNegotiating && hasOffer));

    return (
        <>
            <FreeAgencyPlayerModal
                key={player.ID}
                player={player}
                idx={idx}
                viewMode={viewMode}
            />
            <FreeAgentOfferModal
                key={player.ID}
                team={team}
                player={player}
                idx={idx}
                ts={ts}
                extend={extend}
                viewMode={viewMode}
            />
            <CancelOfferModal
                key={player.ID}
                player={player}
                idx={idx}
                cancel={cancel}
                teamID={team.ID}
                viewMode={viewMode}
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
                    <h6>{player.Position}</h6>
                </td>
                <td className="align-middle" style={{ width: 175 }}>
                    <h6>{player.Archetype}</h6>
                </td>
                <td className="align-middle">
                    <h6>{player.Experience}</h6>
                </td>
                <td className="align-middle">
                    <h6>{player.Age}</h6>
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
                    <h6>{player.MinimumValue}</h6>
                </td>
                <td className="align-middle">
                    <h6>{leadingTeams}</h6>
                </td>
                <td className="align-middle">
                    <div className="btn-group">
                        {canMakeOffer ? (
                            <button
                                type="button"
                                className="btn"
                                title="Make An Offer"
                                data-bs-toggle="modal"
                                data-bs-target={offerTarget}
                            >
                                <i className="bi bi-cash-coin image-nfl-roster" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn"
                                title="Make An Offer"
                                disabled
                            >
                                <i className="bi bi-cash-coin image-nfl-roster" />
                            </button>
                        )}
                        {hasOffer && canModify ? (
                            <button
                                type="button"
                                className="btn"
                                title="Cancel Existing Offer"
                                data-bs-toggle="modal"
                                data-bs-target={cancelTarget}
                            >
                                <i class="bi bi-x-circle image-nfl-roster" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn"
                                title="Cancel Existing Offer"
                                disabled
                            >
                                <i class="bi bi-x-circle image-nfl-roster" />
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default NFLFreeAgencyRow;
