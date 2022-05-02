import React from 'react';

const CFBTeamBoardSidebar = (props) => {
    const { cfbTeam, recruitingProfile } = props;
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

    return (
        <>
            <div className="row mt-3">
                <div className="justify-content-start">
                    <h4>{cfbTeam ? cfbTeam.TeamName : 'Team'} Profile</h4>
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
                    <div className="row mt-1 justify-content-center">None</div>
                )}
            </div>
            <div className="row mt-3 justify-content-center">
                <h5>Recruiting Class Rank</h5>
                {recruitingProfile
                    ? recruitingProfile.RecruitingClassRank
                    : 'N/A'}
            </div>
            <div className="row mt-3 justify-content-center">
                <h5>Recruiting Class Score</h5>
                {recruitingProfile
                    ? recruitingProfile.ESPNScore +
                      recruitingProfile.RivalsScore +
                      recruitingProfile.Top25Score
                    : 'N/A'}
            </div>
            <div className="row mt-3 justify-content-center">
                <h5>Scholarships Available</h5>
                {recruitingProfile
                    ? 25 - recruitingProfile.TotalCommitments
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

export default CFBTeamBoardSidebar;
