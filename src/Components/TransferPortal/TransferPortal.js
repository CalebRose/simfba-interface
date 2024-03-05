import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Spinner } from '../_Common/Spinner';
import { connect } from 'react-redux';

const TransferPortal = ({
    isCFB,
    currentUser,
    cfb_Timestamp,
    cbb_Timestamp,
    viewMode
}) => {
    const transferService = null;
    const [isLoading, setIsLoading] = useState(true);
    const [teamProfile, setTeamProfile] = useState(null);
    const [allPlayers, setAllPlayers] = useState(null);
    const [viewablePlayers, setViewablePlayers] = useState(null);
    const [mobileView, setMobileView] = useState('DRAFT');
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
    const [viewCount, setViewCount] = useState(100);
    const isMobile = useMediaQuery({ query: `(max-width:851px)` });
    const [viewPlayer, setViewPlayer] = useState(null);

    // For mobile
    useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    useEffect(() => {
        if (currentUser) {
        }
    }, [currentUser]);

    const GetTransferPortalData = () => {};

    const AddPlayerToBoard = () => {};

    const RemovePlayerFromBoard = () => {};

    const SwitchView = (event) => {};

    const CommitPromise = () => {};

    const RemovePromise = () => {};

    const SaveBoard = () => {};

    return (
        <>
            <div className="container-fluid mt-3">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="row">
                            <h4>Transfer Portal</h4>
                        </div>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-10"></div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

const mapStateToProps = ({
    user: { currentUser },
    timestamp: { cbb_Timestamp, cfb_Timestamp },
    viewMode: { viewMode }
}) => ({
    currentUser,
    cbb_Timestamp,
    cfb_Timestamp,
    viewMode
});

export default connect(mapStateToProps)(TransferPortal);
