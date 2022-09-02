import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import routes from '../../../Constants/routes';

const CFBDashboardSidebar = (props) => {
    const { cfbTeam, teamNeeds, recruitingProfile } = props;
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const affinityList =
        recruitingProfile !== undefined && recruitingProfile !== null
            ? recruitingProfile.Affinities
            : [];
    const hasApplicableAffinities = (arr) => {
        if (arr !== undefined && arr !== null) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].IsApplicable) {
                    return true;
                }
            }
        }
        return false;
    };

    const applicableAffinities = hasApplicableAffinities(affinityList);

    const colors = {
        color: '#fff',
        backgroundColor:
            cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d',
        borderColor: cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d'
    };

    const QBNeeds =
        teamNeeds && teamNeeds['QB'] !== undefined ? teamNeeds['QB'] : 0;
    const RBNeeds =
        teamNeeds && teamNeeds['RB'] !== undefined ? teamNeeds['RB'] : 0;
    const WRNeeds =
        teamNeeds && teamNeeds['WR'] !== undefined ? teamNeeds['WR'] : 0;
    const TENeeds =
        teamNeeds && teamNeeds['TE'] !== undefined ? teamNeeds['TE'] : 0;
    const OTNeeds =
        teamNeeds && teamNeeds['OT'] !== undefined ? teamNeeds['OT'] : 0;
    const OGNeeds =
        teamNeeds && teamNeeds['OG'] !== undefined ? teamNeeds['OG'] : 0;
    const CNeeds =
        teamNeeds && teamNeeds['C'] !== undefined ? teamNeeds['C'] : 0;
    const FBNeeds =
        teamNeeds && teamNeeds['FB'] !== undefined ? teamNeeds['FB'] : 0;
    const DTNeeds =
        teamNeeds && teamNeeds['DT'] !== undefined ? teamNeeds['DT'] : 0;
    const DENeeds =
        teamNeeds && teamNeeds['DE'] !== undefined ? teamNeeds['DE'] : 0;
    const ILBNeeds =
        teamNeeds && teamNeeds['ILB'] !== undefined ? teamNeeds['ILB'] : 0;
    const OLBNeeds =
        teamNeeds && teamNeeds['OLB'] !== undefined ? teamNeeds['OLB'] : 0;
    const CBNeeds =
        teamNeeds && teamNeeds['CB'] !== undefined ? teamNeeds['CB'] : 0;
    const FSNeeds =
        teamNeeds && teamNeeds['FS'] !== undefined ? teamNeeds['FS'] : 0;
    const SSNeeds =
        teamNeeds && teamNeeds['SS'] !== undefined ? teamNeeds['SS'] : 0;
    const KNeeds =
        teamNeeds && teamNeeds['K'] !== undefined ? teamNeeds['K'] : 0;
    const PNeeds =
        teamNeeds && teamNeeds['P'] !== undefined ? teamNeeds['P'] : 0;

    const DesktopRender = () => {
        return (
            <>
                <div className="row gx-1 mt-3">
                    <div className="justify-content-start">
                        <h4>{cfbTeam ? cfbTeam.TeamName : 'Team'} Profile</h4>
                        <Link
                            to={routes.CFB_TEAM_RECRUITING_BOARD}
                            type="button"
                            className="btn btn-primary btn-md me-2 shadow"
                            style={colors ? colors : {}}
                        >
                            Recruiting Board
                        </Link>
                    </div>
                </div>
                <div className="row gx-1 mt-3">
                    <div className="justify-content-center">
                        <h6>Home State</h6>
                        {cfbTeam.State}
                    </div>
                </div>
                <div className="row gx-1 mt-3 justify-content-center">
                    <h6>Active Affinities</h6>
                    {applicableAffinities &&
                    affinityList &&
                    affinityList.length > 0 ? (
                        affinityList.map((x) => {
                            return x.IsApplicable ? (
                                <div className="row mt-1">
                                    <strong>{x.AffinityName}</strong>
                                </div>
                            ) : (
                                ''
                            );
                        })
                    ) : (
                        <div className="row gx-1 mt-1 justify-content-center">
                            None
                        </div>
                    )}
                </div>
                <div className="row gx-1 mt-3 justify-content-center">
                    <h6>Weekly Points Remaining</h6>
                    {recruitingProfile
                        ? recruitingProfile.WeeklyPoints -
                          recruitingProfile.SpentPoints
                        : 'N/A'}
                </div>
                <div className="row gx-1 mt-3 justify-content-center">
                    <h6>Scholarships Available</h6>
                    {recruitingProfile
                        ? recruitingProfile.RecruitClassSize -
                          recruitingProfile.TotalCommitments
                        : 'N/A'}
                </div>
                <div className="row gx-1 mt-3 justify-content-center">
                    <h6>Scholarship Offers Available</h6>
                    {recruitingProfile
                        ? recruitingProfile.ScholarshipsAvailable
                        : 'N/A'}
                </div>
                <div className="row gx-0 mt-3 justify-content-center">
                    <h6>Graduating Players By Position</h6>
                    <div className="row">
                        <div className="col-md-4">
                            <strong>Off.</strong>
                        </div>
                        <div className="col-md-4">
                            <strong>Def.</strong>
                        </div>
                        <div className="col-md-4">
                            <strong>ST.</strong>
                        </div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">QB: {QBNeeds}</div>
                        <div className="col-md-4">DT: {DTNeeds}</div>
                        <div className="col-md-4">K: {KNeeds}</div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">RB: {RBNeeds}</div>
                        <div className="col-md-4">DE: {DENeeds}</div>
                        <div className="col-md-4">P: {PNeeds}</div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">FB: {FBNeeds}</div>
                        <div className="col-md-4">ILB: {ILBNeeds}</div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">WR: {WRNeeds}</div>
                        <div className="col-md-4">OLB: {OLBNeeds}</div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">TE: {TENeeds}</div>
                        <div className="col-md-4">CB: {CBNeeds}</div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">OT: {OTNeeds}</div>
                        <div className="col-md-4">FS: {FSNeeds}</div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">OG: {OGNeeds}</div>
                        <div className="col-md-4">SS: {SSNeeds}</div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row gx-0">
                        <div className="col-md-4">C: {CNeeds}</div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </>
        );
    };

    const MobileRender = () => {
        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {cfbTeam ? cfbTeam.TeamName : 'Team'} Profile
                        </h4>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Home State: {cfbTeam.State}
                        </h6>
                        <h6 className="card-text mb-1">Active Affinities</h6>
                    </div>
                    <ul className="list-group list-group-flush">
                        {applicableAffinities &&
                        affinityList &&
                        affinityList.length > 0 ? (
                            affinityList.map((x) => {
                                return x.IsApplicable ? (
                                    <li className="list-group-item">
                                        <strong>{x.AffinityName}</strong>
                                    </li>
                                ) : (
                                    ''
                                );
                            })
                        ) : (
                            <li className="list-group-item">None</li>
                        )}
                    </ul>
                    <ul className="list-group list-group-flush mt-1">
                        <li className="list-group-item">
                            <h6>Weekly Points Remaining</h6>
                            {recruitingProfile
                                ? recruitingProfile.WeeklyPoints -
                                  recruitingProfile.SpentPoints
                                : 'N/A'}
                        </li>
                        <li className="list-group-item">
                            <h6>Scholarships Available</h6>
                            {recruitingProfile
                                ? 25 - recruitingProfile.TotalCommitments
                                : 'N/A'}
                        </li>
                        <li className="list-group-item">
                            <h6>Scholarship Offers Available</h6>
                            {recruitingProfile
                                ? recruitingProfile.ScholarshipsAvailable
                                : 'N/A'}
                        </li>
                    </ul>
                    <div className="card-body">
                        <Link
                            to={routes.CFB_TEAM_RECRUITING_BOARD}
                            type="button"
                            className="btn btn-primary btn-md me-2 shadow"
                            style={colors ? colors : {}}
                        >
                            Recruiting Board
                        </Link>
                    </div>
                </div>
            </>
        );
    };

    return isMobile ? <MobileRender /> : <DesktopRender />;
};

export default CFBDashboardSidebar;
