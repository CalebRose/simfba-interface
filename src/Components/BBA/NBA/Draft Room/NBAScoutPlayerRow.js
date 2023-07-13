import React from 'react';

export const NBAScoutPlayerRow = ({
    idx,
    profile,
    map,
    ts,
    remove,
    draft,
    currentDraftPick,
    wr,
    theme,
    reveal,
    setDraftee
}) => {
    const { Draftee } = profile;
    const { TeamID, SpentPoints } = wr;
    const modalTarget = `#drafteeModal`;

    const removePlayerFromBoard = () => {
        return remove(profile);
    };

    const draftPlayer = () => {
        return draft(profile);
    };

    const revealAttr = (event) => {
        const { name, value } = event.currentTarget;
        return reveal(idx, profile, name, value);
    };

    const lockPlayer =
        map[profile.PlayerID] ||
        currentDraftPick.TeamID !== TeamID ||
        !ts.IsDraftTime;

    const setModal = () => {
        return setDraftee(() => Draftee);
    };

    return (
        <>
            <tr className="scout-row">
                <td className="align-middle">
                    <h6>
                        {Draftee.Position} {Draftee.FirstName}{' '}
                        {Draftee.LastName}
                    </h6>
                </td>
                <td className="align-middle">{Draftee.Age}</td>
                <td className="align-middle">{Draftee.Height}</td>
                <td className="align-middle">{Draftee.College}</td>
                <td className="align-middle">
                    {profile.ShowCount < 4
                        ? Draftee.OverallGrade
                        : Draftee.Overall}
                </td>
                <td className="align-middle">
                    {!profile.ShowShooting2 ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Shooting2"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.Shooting2Grade}
                        </button>
                    ) : (
                        Draftee.Shooting2
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowShooting3 ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Shooting3"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.Shooting3Grade}
                        </button>
                    ) : (
                        Draftee.Shooting3
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowFreeThrow ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="FreeThrow"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.FreeThrowGrade}
                        </button>
                    ) : (
                        Draftee.FreeThrow
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowFinishing ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Finishing"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.FinishingGrade}
                        </button>
                    ) : (
                        Draftee.Finishing
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowBallwork ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Ballwork"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.BallworkGrade}
                        </button>
                    ) : (
                        Draftee.Ballwork
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowRebounding ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Rebounding"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.ReboundingGrade}
                        </button>
                    ) : (
                        Draftee.Rebounding
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowInteriorDefense ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="InteriorDefense"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.InteriorDefenseGrade}
                        </button>
                    ) : (
                        Draftee.InteriorDefense
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowPerimeterDefense ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="PerimeterDefense"
                            value={4}
                            disabled={SpentPoints + 4 > 100}
                        >
                            {Draftee.PerimeterDefenseGrade}
                        </button>
                    ) : (
                        Draftee.PerimeterDefense
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowPotential ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Potential"
                            value="10"
                            disabled={SpentPoints + 10 > 100}
                        >
                            <i class="bi bi-question-circle" />
                        </button>
                    ) : (
                        Draftee.PotentialGrade
                    )}
                </td>
                <td>
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target={modalTarget}
                            onClick={setModal}
                        >
                            <i
                                className={`bi bi-info-circle ${
                                    theme === 'dark' ? 'text-light' : ''
                                }`}
                            />
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            disabled={lockPlayer}
                            onClick={draftPlayer}
                        >
                            <i className="bi bi-person-add" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={removePlayerFromBoard}
                        >
                            <i className="bi bi-trash" />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};
