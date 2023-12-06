import React from 'react';
import { GetModalClass } from '../../../Constants/CSSClassHelper';
import { ConfirmModal } from '../../_Common/ModalComponents';

const ConfirmSaveRecruitingBoardModal = (props) => {
    const { viewMode } = props;
    const modalId = 'saveBoardModal';

    const SaveChanges = () => {
        return props.save();
    };
    const modalClass = GetModalClass(viewMode);
    const header = 'Confirm Save Recruiting Board';
    return (
        <ConfirmModal
            ModalID={modalId}
            ModalClass={modalClass}
            Header={header}
            ConfirmChanges={SaveChanges}
        >
            <div className="row g-2 gy-2 mb-2">
                All Point Submissions will be saved. Would you like to confirm
                this action?
            </div>
        </ConfirmModal>
    );
};

export default ConfirmSaveRecruitingBoardModal;
