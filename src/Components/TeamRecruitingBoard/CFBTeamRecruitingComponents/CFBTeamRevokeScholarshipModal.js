import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { ConfirmModal } from '../../_Common/ModalComponents';

const ConfirmRevokeModal = (props) => {
    const { idx, viewMode } = props;
    const modalId = 'revokeModal' + idx;

    const confirmChange = () => {
        return props.revoke();
    };
    const modalClass = GetModalClass(viewMode);
    const header = 'Confirm Revoke Scholarship';

    return (
        <ConfirmModal
            ModalID={modalId}
            ModalClass={modalClass}
            Header={header}
            ConfirmChanges={() => confirmChange()}
        >
            <div className="row g-2 gy-2 mb-2">
                Once a scholarship has been revoked, you cannot re-offer a
                scholarship to this recruit. Are you sure you would like to make
                this decision?
            </div>
        </ConfirmModal>
    );
};

export default ConfirmRevokeModal;
