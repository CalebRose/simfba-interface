import React from 'react';

const CFBDashboardSidebar = (props) => {
    const { cfbTeam, teamNeeds, recruitingProfile } = props;
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
                <h5>Weekly Points Remaining</h5>
                {recruitingProfile
                    ? recruitingProfile.WeeklyPoints -
                      recruitingProfile.SpentPoints
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
                <h5>Graduating Players By Position</h5>
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
                <div className="row">
                    <div className="col-md-4">QB: {QBNeeds}</div>
                    <div className="col-md-4">DT: {DTNeeds}</div>
                    <div className="col-md-4">K: {KNeeds}</div>
                </div>
                <div className="row">
                    <div className="col-md-4">RB: {RBNeeds}</div>
                    <div className="col-md-4">DE: {DENeeds}</div>
                    <div className="col-md-4">P: {PNeeds}</div>
                </div>
                <div className="row">
                    <div className="col-md-4">FB: {FBNeeds}</div>
                    <div className="col-md-4">ILB: {ILBNeeds}</div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-4">WR: {WRNeeds}</div>
                    <div className="col-md-4">OLB: {OLBNeeds}</div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-4">TE: {TENeeds}</div>
                    <div className="col-md-4">CB: {CBNeeds}</div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-4">OT: {OTNeeds}</div>
                    <div className="col-md-4">FS: {FSNeeds}</div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-4">OG: {OGNeeds}</div>
                    <div className="col-md-4">SS: {SSNeeds}</div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-4">C: {CNeeds}</div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    );
};

export default CFBDashboardSidebar;
