import React from 'react';
import { GetMobileCardClass } from '../../../Constants/CSSClassHelper';
import { getLogo } from '../../../Constants/getLogo';
import { baseUrl } from '../../../Constants/logos';
import { GetNFLOverall } from '../../../_Utility/RosterHelper';
import { HeightToFeetAndInches } from '../../../_Utility/utilHelper';
import { CancelOfferModal } from './CancelOfferModal';
import { FreeAgencyPlayerModal } from './FreeAgencyPlayerModal';
import { FreeAgentOfferModal } from './FreeAgentOfferModal';

export const NFLFreeAgencyMobileRow = ({
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
    const mobileCardClass = GetMobileCardClass(viewMode);
    let ovr = GetNFLOverall(player.Overall, player.ShowLetterGrade);
    const year = player.Experience === 0 ? 'R' : player.Experience;
    const heightObj = HeightToFeetAndInches(player.Height);
    const checkForOffer = (player) => {
        if (player.Offers !== null && player.Offers.length > 0) {
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
            <div className={`${mobileCardClass} mb-2`}>
                <div className="card-body">
                    <h5 className="card-title">
                        Rank:{rank} | {player.FirstName} {player.LastName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {year === 'R' ? 'Rookie' : `${year} Year`}{' '}
                        {player.Archetype} {player.Position} from{' '}
                        {player.Hometown}, {player.State}
                    </h6>
                    <p className="card-text">
                        {heightObj.feet}' {heightObj.inches}", {player.Weight}{' '}
                        lbs
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Overall: {ovr}, Potential: {player.PotentialGrade}
                    </li>
                    <li className="list-group-item">
                        Status: {StatusLabel} | Minimum Value:{' '}
                        {player.MinimumValue}
                    </li>
                    <li className="list-group-item">{leadingTeams}</li>
                    <li className="list-group-item">
                        Make an Offer | Cancel Offer
                    </li>
                    <li className="list-group-item">
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
                        )}{' '}
                        |{' '}
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
                    </li>
                </ul>
            </div>
        </>
    );
};
