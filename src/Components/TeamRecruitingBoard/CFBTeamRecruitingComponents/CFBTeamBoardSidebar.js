import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { RoundToTwoDecimals } from '../../../_Utility/utilHelper';
import { Link } from 'react-router-dom';
import routes from '../../../Constants/routes';

const CFBTeamBoardSidebar = (props) => {
    const { cfbTeam, recruitingProfile } = props;
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const isMobile = useMediaQuery({ query: `(max-width:844px)` });

    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const RES =
        recruitingProfile !== undefined && recruitingProfile !== null
            ? Math.round(recruitingProfile.RecruitingEfficiencyScore * 100)
            : 0;
    const affinityList =
        recruitingProfile !== undefined && recruitingProfile !== null
            ? recruitingProfile.Affinities
            : [];

    const colors = {
        color: '#fff',
        backgroundColor:
            cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d',
        borderColor: cfbTeam && cfbTeam.ColorOne ? cfbTeam.ColorOne : '#6c757d'
    };

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

    const DesktopRender = () => {
        return (
            <>
                <div className="row mt-3">
                    <div className="justify-content-start">
                        <h4>{cfbTeam ? cfbTeam.TeamName : 'Team'} Profile</h4>
                        <Link
                            to={routes.CFB_RECRUITING}
                            type="button"
                            className="btn btn-primary btn-md me-2 shadow"
                            style={colors ? colors : {}}
                        >
                            Recruiting Overview
                        </Link>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="justify-content-center">
                        <h5>Home State</h5>
                        {cfbTeam.State}
                    </div>
                </div>
                <div className="row mt-3 justify-content-center">
                    <h5>Active Affinities</h5>
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
                        <div className="row mt-1 justify-content-center">
                            None
                        </div>
                    )}
                </div>
                <div className="row mt-3 justify-content-center">
                    <h5>Recruiting Efficiency Score</h5>
                    {recruitingProfile ? `${RES}%` : 'N/A'}
                </div>
                {/* <div className="row mt-3 justify-content-center">
            <h5>Recruiting Class Rank</h5>
            {recruitingProfile
                ? recruitingProfile.RecruitingClassRank
                : 'N/A'}
        </div> */}
                <div className="row mt-3 justify-content-center">
                    <h5>Recruiting Class Score</h5>
                    {recruitingProfile
                        ? RoundToTwoDecimals(
                              recruitingProfile.ESPNScore +
                                  recruitingProfile.RivalsScore +
                                  recruitingProfile.Rank247Score
                          )
                        : 'N/A'}
                </div>
                <div className="row mt-3 justify-content-center">
                    <h5>Scholarships Available</h5>
                    {recruitingProfile
                        ? recruitingProfile.RecruitClassSize -
                          recruitingProfile.TotalCommitments
                        : 'N/A'}
                </div>
                <div className="row mt-3 justify-content-center">
                    <h5>Scholarship Offers Available</h5>
                    {recruitingProfile
                        ? recruitingProfile.ScholarshipsAvailable
                        : 'N/A'}
                </div>
                <div className="row mt-3 justify-content-center">
                    <h5>Signed Players By Position (Soon)</h5>
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
                        <h5 className="card-subtitle mb-2 text-muted">
                            Home State: {cfbTeam.State}
                        </h5>
                        <h5 className="card-text mb-1">Active Affinities</h5>
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
                            <h5>Recruiting Efficiency Score</h5>
                            {recruitingProfile ? `${RES}%` : 'N/A'}
                        </li>
                        <li className="list-group-item">
                            <h5>Recruiting Class Score</h5>
                            {recruitingProfile
                                ? RoundToTwoDecimals(
                                      recruitingProfile.ESPNScore +
                                          recruitingProfile.RivalsScore +
                                          recruitingProfile.Rank247Score
                                  )
                                : 'N/A'}
                        </li>
                        <li className="list-group-item">
                            <h5>Scholarships Available</h5>
                            {recruitingProfile
                                ? 25 - recruitingProfile.TotalCommitments
                                : 'N/A'}
                        </li>
                        <li className="list-group-item">
                            <h5>Scholarship Offers Available</h5>
                            {recruitingProfile
                                ? recruitingProfile.ScholarshipsAvailable
                                : 'N/A'}
                        </li>
                    </ul>
                    <div className="card-body">
                        <Link
                            to={routes.CFB_RECRUITING}
                            type="button"
                            className="btn btn-primary btn-md me-2 shadow"
                            style={colors ? colors : {}}
                        >
                            Recruiting Overview
                        </Link>
                    </div>
                </div>
            </>
        );
    };

    return isMobile ? <MobileRender /> : <DesktopRender />;
};

export default CFBTeamBoardSidebar;
