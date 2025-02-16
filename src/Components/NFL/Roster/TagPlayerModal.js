import React, { useEffect, useState } from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { ConfirmModal } from '../../_Common/ModalComponents';
import tagData from '../../../Constants/tagData.json';

export const TagPlayerModal = ({ player, tag, team, viewMode }) => {
    const modalId = `tagPlayer`;
    const { SeasonStats, FirstName, LastName, ProBowls, Position } =
        player || {};
    const { UsedTagThisSeason } = team || {};
    const name = `${FirstName} ${LastName}`;
    const [tagType, setTagType] = useState('Basic');
    const [valid, setValid] = useState(false);
    const [bonus, setBonus] = useState(0.5);
    const snapLimit = 65;
    const metSnapLimit = SeasonStats
        ? SeasonStats.Snaps / SeasonStats.GamesPlayed >= snapLimit
        : false;

    const confirmChange = () => {
        if (!valid) return;
        return tag(player, tagType);
    };

    useEffect(() => {
        if (player) {
            const data = tagData;
            let tt = tagType;
            if (tagType === 'Basic') {
                // Check for playtime
                tt = metSnapLimit ? 'Playtime' : 'Basic';
            }
            const bonusAmount = data[player.Position][tt];
            if (bonusAmount) {
                setBonus(() => bonusAmount);
            }
            if (
                tagType === 'Basic' ||
                (tagType === 'Playtime' && player.Year < 5)
            ) {
                setValid(() => true);
            } else if (
                tagType === 'Basic' ||
                (tagType === 'Playtime' && player.Year >= 5)
            ) {
                setValid(() => false);
            }
        }
    }, [tagType, player]);

    const modalHeader = `Tag ${name}`;

    return !player ? (
        <></>
    ) : (
        <ConfirmModal
            ModalID={modalId}
            ModalClass="modal-content"
            Header={modalHeader}
            ConfirmChanges={confirmChange}
            IsValid={valid}
        >
            <div className="row g-2 gy-2 mb-2">
                WARNING: Once you've tagged {name}, they will have another year
                added to their existing contract. Tagging will not be an option
                for them next season and an extension must be negotiated. If no
                extension is negotiated, they will enter free agency because you
                couldn't pay them the money they deserve. So they will look for
                opporunities elsewhere so they can support their loved ones and
                the mortgage they have on their home.
            </div>

            <div className="row g-2 gy-2 mb-2">
                Do you really want to tag {name} and put them through all that
                trouble for just another season? Think of your capsheet...
            </div>

            {!valid && (
                <div className="row g-2 gy-2 mb-2">
                    <p className="text-danger">
                        WARNING! The tag selected is not valid to the player.
                        Please select a different one. Clicking confirm will NOT
                        submit the tag.
                    </p>
                </div>
            )}

            <div className="row g-2 gy-2 mb-2">
                <h6>Estimated Value of {tagType} Tag</h6>
                <div className="col">
                    <p>
                        <strong>Salary:</strong> $0.5M
                    </p>
                </div>
                <div className="col">
                    <p>
                        <strong>Bonus:</strong> ${bonus}M
                    </p>
                </div>
            </div>

            <div className="row mb-2">
                <div className="btn-group">
                    <button
                        className={`btn ${
                            tagType === 'Basic'
                                ? 'btn-primary'
                                : 'btn-secondary'
                        }`}
                        disabled={tagType === 'Basic'}
                    >
                        Basic
                    </button>
                    <button
                        className={`btn ${
                            tagType === 'Transition'
                                ? 'btn-primary'
                                : 'btn-secondary'
                        }`}
                        disabled
                    >
                        Playtime
                    </button>
                    <button
                        className={`btn ${
                            tagType === 'Transition'
                                ? 'btn-primary'
                                : 'btn-secondary'
                        }`}
                        disabled
                    >
                        Transition
                    </button>
                    <button
                        className={`btn ${
                            tagType === 'Franchise'
                                ? 'btn-primary'
                                : 'btn-secondary'
                        }`}
                        disabled={tagType === 'Franchise' || UsedTagThisSeason}
                    >
                        Franchise
                    </button>
                </div>
            </div>
        </ConfirmModal>
    );
};
