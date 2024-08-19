import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { ConfirmModal } from '../../_Common/ModalComponents';

const ConfirmRemovePlayerFromBoardModal = (props) => {
    const { idx, viewMode } = props;
    const modalId = 'removeModal' + idx;

    const confirmChange = () => {
        return props.removePlayer();
    };
    const modalClass = GetModalClass(viewMode);
    const header = 'Confirm Remove Recruit';
    return (
        <ConfirmModal
            ModalID={modalId}
            ModalClass={modalClass}
            Header={header}
            ConfirmChanges={confirmChange}
            IsValid
        >
            <div className="row g-2 gy-2 mb-2">
                You will always be able to re-add this recruit onto your board
                from the CFB Recruiting Dashboard page.
            </div>
        </ConfirmModal>
    );
};

export default ConfirmRemovePlayerFromBoardModal;
