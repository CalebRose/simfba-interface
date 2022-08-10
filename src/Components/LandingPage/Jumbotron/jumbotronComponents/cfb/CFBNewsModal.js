import React from 'react';

const CFBNewsModal = (props) => {
    const { timestamp, newsLogs } = props;
    const modalId = 'newsModal';

    return (
        <div
            className="modal fade"
            id={modalId}
            tabindex="-1"
            data-bs-keyboard="false"
            aria-labelledby="rankingModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="rankingsModalLabel">
                            Week {timestamp && timestamp.CollegeWeek} News
                            Report
                        </h2>
                    </div>
                    <div className="modal-body">
                        {newsLogs &&
                            newsLogs.length > 0 &&
                            newsLogs.map((x) => (
                                <div className="row">
                                    <em>{x.Message}</em>
                                </div>
                            ))}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CFBNewsModal;
