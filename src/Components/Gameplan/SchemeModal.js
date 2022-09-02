import React from 'react';

const SchemeModal = () => {
    return (
        <div
            className="modal fade"
            id="schemeModal"
            tabindex="-1"
            aria-labelledby="schemeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="crootModalLabel">
                            Offensive Scheme Info
                        </h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-2">
                            This is the scheme that your team uses as the
                            foundation of your offense. Pro is the standard
                            offense seen with many NFL and collegiate programs;
                            Spread Option is a hybrid between pistol and the
                            spread offense and is designed for dual-threat QBs
                            in mind; Air Raid is designed for pass-heavy teams
                            in a spread offense; and Double Wing Option is for
                            run-heavy teams using a scheme found similar with
                            Army's and Navy's current collegiate programs.
                        </div>

                        <div>
                            Please note that if you change offensive schemes
                            past your team's first game, you will need to notify
                            your next opponent of the scheme change. Please use
                            the #schemechange channel on the SimFBA Discord
                            Server and the following{' '}
                            <a
                                href="https://www.simfba.com/index.php?threads/2022-cfb-scheme-changes-thread.3454/"
                                target="_blank"
                            >
                                link
                            </a>{' '}
                            to notify your opponent. Both of these steps are
                            necessary, even if your opponent is AI. Failure to
                            do so will incur a penalty for your program moving
                            forward.
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
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

export default SchemeModal;
