import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { ConfirmModal } from '../../_Common/ModalComponents';

export const CutPlayerModal = ({ player, idx, cut, viewMode }) => {
    const modalId = `cutPlayer${idx}`;
    const name = `${player.FirstName} ${player.LastName}`;

    const confirmChange = () => {
        console.log('PING!');
        return cut(player);
    };

    const modalHeader = `Cut ${name}`;

    return (
        <ConfirmModal
            ModalID={modalId}
            ModalClass="modal-content"
            Header={modalHeader}
            ConfirmChanges={confirmChange}
        >
            <div className="row g-2 gy-2 mb-2">
                WARNING: Once you've cut {name}, they will be placed on the
                waiver wire with their existing contract. After that, they will
                have to hope another team picks them up on the waiver wire. And
                if worse, find a way to sign with a different team so that they
                can support their loved ones and the mortgage they have on their
                home.
            </div>

            <div className="row g-2 gy-2 mb-2">
                Do you really want to put {name} through all that trouble just
                to take a Cap Hit? Think of the players and their families...
            </div>
        </ConfirmModal>
    );
};
