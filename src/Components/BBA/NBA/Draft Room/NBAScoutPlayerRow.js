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
    setDraftee,
    isMobile
}) => {
    const { Draftee } = profile;
    const { TeamID, SpentPoints } = wr;
    const modalTarget = `#drafteeModal`;

    const removePlayerFromBoard = () => {
        return remove(profile);
    };

    const draftPlayer = () => {
        return draft(Draftee);
    };

    const revealAttr = (event) => {
        const { name, value } = event.currentTarget;
        return reveal(idx, profile, name, value);
    };

    const lockPlayer =
        map[profile.PlayerID] ||
        (currentDraftPick && currentDraftPick.TeamID !== TeamID) ||
        !ts.IsDraftTime;

    const setModal = () => {
        const obj = { Draftee: Draftee };
        return setDraftee(() => obj);
    };

    return !isMobile ? (
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
                    {!profile.ShowFinishing ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Finishing"
                            value={4}
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
                        >
                            {Draftee.FinishingGrade}
                        </button>
                    ) : (
                        Draftee.Finishing
                    )}
                </td>
                <td className="align-middle">
                    {!profile.ShowShooting2 ? (
                        <button
                            type="button"
                            className="btn btn-small btn-outline-light"
                            onClick={revealAttr}
                            name="Shooting2"
                            value={4}
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
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
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
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
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
                        >
                            {Draftee.FreeThrowGrade}
                        </button>
                    ) : (
                        Draftee.FreeThrow
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
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
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
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
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
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
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
                            disabled={SpentPoints + 4 > 300}
                            style={{ fontSize: '1.6vh' }}
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
                            disabled={SpentPoints + 10 > 300}
                            style={{ fontSize: '1.6vh' }}
                        >
                            <i className="bi bi-question-circle" />
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
    ) : (
        <>
            <div className="card mb-1">
                <div className="card-body">
                    <h5 className="card-title">
                        {Draftee.FirstName} {Draftee.LastName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        {Draftee.Age} year old {Draftee.Height}{' '}
                        {Draftee.Position} from {Draftee.College}
                    </h6>
                    <p className="card-text">
                        Overall:{' '}
                        {profile.ShowCount < 4
                            ? Draftee.OverallGrade
                            : Draftee.Overall}
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        2pt Shooting:{' '}
                        {!profile.ShowShooting2 ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="Shooting2"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.Shooting2Grade}
                            </button>
                        ) : (
                            Draftee.Shooting2
                        )}{' '}
                        | 3pt Shooting:{' '}
                        {!profile.ShowShooting3 ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="Shooting3"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.Shooting3Grade}
                            </button>
                        ) : (
                            Draftee.Shooting3
                        )}
                    </li>
                    <li className="list-group-item">
                        Finishing:{' '}
                        {!profile.ShowFinishing ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="Finishing"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.FinishingGrade}
                            </button>
                        ) : (
                            Draftee.Finishing
                        )}{' '}
                        | Free Throw:{' '}
                        {!profile.ShowFreeThrow ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="FreeThrow"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.FreeThrowGrade}
                            </button>
                        ) : (
                            Draftee.FreeThrow
                        )}
                    </li>
                    <li className="list-group-item">
                        Rebounding:{' '}
                        {!profile.ShowRebounding ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="Rebounding"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.ReboundingGrade}
                            </button>
                        ) : (
                            Draftee.Rebounding
                        )}{' '}
                        | Ballwork:{' '}
                        {!profile.ShowBallwork ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="Ballwork"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.BallworkGrade}
                            </button>
                        ) : (
                            Draftee.Ballwork
                        )}
                    </li>
                    <li className="list-group-item">
                        Int. Defense:{' '}
                        {!profile.ShowInteriorDefense ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="InteriorDefense"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.InteriorDefenseGrade}
                            </button>
                        ) : (
                            Draftee.InteriorDefense
                        )}{' '}
                        | Per. Defense:{' '}
                        {!profile.ShowPerimeterDefense ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="PerimeterDefense"
                                value={4}
                                disabled={SpentPoints + 4 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                {Draftee.PerimeterDefenseGrade}
                            </button>
                        ) : (
                            Draftee.PerimeterDefense
                        )}
                    </li>
                    <li className="list-group-item">
                        Potential:{' '}
                        {!profile.ShowPotential ? (
                            <button
                                type="button"
                                className="btn btn-small btn-outline-light"
                                onClick={revealAttr}
                                name="Potential"
                                value="10"
                                disabled={SpentPoints + 10 > 300}
                                style={{ fontSize: '1.6vh' }}
                            >
                                <i className="bi bi-question-circle" />
                            </button>
                        ) : (
                            Draftee.PotentialGrade
                        )}
                    </li>
                </ul>
                <div className="card-body">
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
                </div>
            </div>
        </>
    );
};
