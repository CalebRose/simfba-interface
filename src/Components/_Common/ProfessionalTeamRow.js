import React from 'react';
import { getLogo } from '../../Constants/getLogo';
import { RoundToTwoDecimals } from '../../_Utility/utilHelper';

export const ProfessionalTeamRow = ({ team, isNFL, click }) => {
    const teamName = isNFL
        ? `${team.TeamName} ${team.Mascot}`
        : `${team.Team} ${team.Nickname}`;
    const teamLogo = getLogo(teamName.trim(), false);

    const NFLCard = () => {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-3">
                        <p className="card-text">
                            <strong>Owner: </strong>
                            <small>
                                {team.NFLOwnerName.length > 0
                                    ? team.NFLOwnerName
                                    : 'None'}
                            </small>{' '}
                            {team.NFLOwnerName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NFLOwnerName}
                                    name={team.ID}
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">
                            <strong>Coach: </strong>
                            <small>
                                {team.NFLCoachName.length > 0
                                    ? team.NFLCoachName
                                    : 'None'}
                            </small>{' '}
                            {team.NFLCoachName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NFLCoachName}
                                    name={team.ID}
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">
                            <strong>GM: </strong>
                            <small>
                                {team.NFLGMName.length > 0
                                    ? team.NFLGMName
                                    : 'None'}
                            </small>{' '}
                            {team.NFLGMName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NFLGMName}
                                    className="btn btn-sm btn-outline-danger"
                                    name={team.ID}
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">
                            <strong>Scout: </strong>
                            <small>
                                {team.NFLAssistantName.length > 0
                                    ? team.NFLAssistantName
                                    : 'None'}
                            </small>{' '}
                            {team.NFLAssistantName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NFLAssistantName}
                                    name={team.ID}
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const NBACard = () => {
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-3">
                        <p className="card-text">
                            <strong>Owner: </strong>
                            <small>
                                {team.NBAOwnerName.length > 0
                                    ? team.NBAOwnerName
                                    : 'None'}
                            </small>{' '}
                            {team.NBAOwnerName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NBAOwnerName}
                                    name={team.ID}
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">
                            <strong>Coach: </strong>
                            <small>
                                {team.NBACoachName.length > 0
                                    ? team.NBACoachName
                                    : 'None'}
                            </small>{' '}
                            {team.NBACoachName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NBACoachName}
                                    name={team.ID}
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">
                            <strong>GM: </strong>
                            <small>
                                {team.NBAGMName.length > 0
                                    ? team.NBAGMName
                                    : 'None'}
                            </small>{' '}
                            {team.NBAGMName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NBAGMName}
                                    className="btn btn-sm btn-outline-danger"
                                    name={team.ID}
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="col-3">
                        <p className="card-text">
                            <strong>Scout: </strong>
                            <small>
                                {team.NBAAssistantName.length > 0
                                    ? team.NBAAssistantName
                                    : 'None'}
                            </small>{' '}
                            {team.NBAAssistantName.length > 0 && (
                                <button
                                    type="button"
                                    value={team.NBAAssistantName}
                                    name={team.ID}
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={click}
                                >
                                    <i class="bi bi-x-circle" />
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="row mb-2">
            <div className="card p-2">
                <div className="row g-0">
                    <div className="col-3">
                        <img
                            src={teamLogo}
                            alt={isNFL ? team.TeamName : team.Team}
                            className="card-img-top imageSize object-fit"
                        />
                    </div>
                    <div className="col-9">
                        {isNFL ? <NFLCard /> : <NBACard />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProfessionalCapsheetRow = ({ team, isNFL, ts }) => {
    const { Capsheet } = team;
    const teamName = isNFL
        ? `${team.TeamName} ${team.Mascot}`
        : `${team.Team} ${team.Nickname}`;
    const teamLogo = getLogo(teamName.trim(), false);

    const NFLCard = () => {
        const y1total =
            Capsheet.Y1Bonus + Capsheet.Y1Salary + Capsheet.Y1CapHit;
        const y2total =
            Capsheet.Y2Bonus + Capsheet.Y2Salary + Capsheet.Y2CapHit;
        const y3total =
            Capsheet.Y3Bonus + Capsheet.Y3Salary + Capsheet.Y3CapHit;
        const y4total =
            Capsheet.Y4Bonus + Capsheet.Y4Salary + Capsheet.Y4CapHit;
        const y5total =
            Capsheet.Y5Bonus + Capsheet.Y5Salary + Capsheet.Y5CapHit;
        const y1remainder = ts.Y1Capspace - y1total;
        const y2remainder = ts.Y2Capspace - y2total;
        const y3remainder = ts.Y3Capspace - y3total;
        const y4remainder = ts.Y4Capspace - y4total;
        const y5remainder = ts.Y5Capspace - y5total;

        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Current Year</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Salary: {RoundToTwoDecimals(Capsheet.Y1Salary)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Bonus: {RoundToTwoDecimals(Capsheet.Y1Bonus)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Penalty: {RoundToTwoDecimals(Capsheet.Y1CapHit)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y1total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y1remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 2</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Salary: {RoundToTwoDecimals(Capsheet.Y2Salary)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Bonus: {RoundToTwoDecimals(Capsheet.Y2Bonus)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Penalty: {RoundToTwoDecimals(Capsheet.Y2CapHit)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y2total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y2remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 3</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Salary: {RoundToTwoDecimals(Capsheet.Y3Salary)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Bonus: {RoundToTwoDecimals(Capsheet.Y3Bonus)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Penalty: {RoundToTwoDecimals(Capsheet.Y3CapHit)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y3total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y3remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 4</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Salary: {RoundToTwoDecimals(Capsheet.Y4Salary)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Bonus: {RoundToTwoDecimals(Capsheet.Y4Bonus)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Penalty: {RoundToTwoDecimals(Capsheet.Y4CapHit)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y4total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y4remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 5</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Salary: {RoundToTwoDecimals(Capsheet.Y5Salary)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Bonus: {RoundToTwoDecimals(Capsheet.Y5Bonus)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Penalty: {RoundToTwoDecimals(Capsheet.Y5CapHit)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y5total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y5remainder)}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const NBACard = () => {
        const y1total =
            Capsheet.Year1Total +
            Capsheet.Year1CashTransferred -
            Capsheet.Year1CashReceived;
        const y2total =
            Capsheet.Year2Total +
            Capsheet.Year2CashTransferred -
            Capsheet.Year2CashReceived;
        const y3total =
            Capsheet.Year3Total +
            Capsheet.Year3CashTransferred -
            Capsheet.Year3CashReceived;
        const y4total =
            Capsheet.Year4Total +
            Capsheet.Year4CashTransferred -
            Capsheet.Year4CashReceived;
        const y5total =
            Capsheet.Year5Total +
            Capsheet.Year5CashTransferred -
            Capsheet.Year5CashReceived;
        const y1remainder = ts.Y1Capspace - y1total;
        const y2remainder = ts.Y2Capspace - y2total;
        const y3remainder = ts.Y3Capspace - y3total;
        const y4remainder = ts.Y4Capspace - y4total;
        const y5remainder = ts.Y5Capspace - y5total;
        return (
            <div className="card-body">
                <div className="row">
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Current Year</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Base: {RoundToTwoDecimals(Capsheet.Year1Total)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Transferred:{' '}
                                {RoundToTwoDecimals(
                                    Capsheet.Year1CashTransferred
                                )}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Received:{' '}
                                {RoundToTwoDecimals(Capsheet.Year1CashReceived)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y1total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y1remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 2</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Base: {RoundToTwoDecimals(Capsheet.Year2Total)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Transferred:{' '}
                                {RoundToTwoDecimals(
                                    Capsheet.Year2CashTransferred
                                )}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Received:{' '}
                                {RoundToTwoDecimals(Capsheet.Year2CashReceived)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y2total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y2remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 3</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Base: {RoundToTwoDecimals(Capsheet.Year3Total)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Transferred:{' '}
                                {RoundToTwoDecimals(
                                    Capsheet.Year3CashTransferred
                                )}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Received:{' '}
                                {RoundToTwoDecimals(Capsheet.Year3CashReceived)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y3total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y3remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 4</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Base: {RoundToTwoDecimals(Capsheet.Year4Total)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Transferred:{' '}
                                {RoundToTwoDecimals(
                                    Capsheet.Year4CashTransferred
                                )}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Received:{' '}
                                {RoundToTwoDecimals(Capsheet.Year4CashReceived)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y4total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y4remainder)}
                            </small>
                        </p>
                    </div>
                    <div className="col-2">
                        <p className="card-text">
                            <strong>Year 5</strong>
                        </p>
                        <p className="card-text">
                            <small>
                                Base: {RoundToTwoDecimals(Capsheet.Year5Total)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Transferred:{' '}
                                {RoundToTwoDecimals(
                                    Capsheet.Year5CashTransferred
                                )}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>
                                Received:{' '}
                                {RoundToTwoDecimals(Capsheet.Year5CashReceived)}
                            </small>
                        </p>
                        <p className="card-text">
                            <small>Total: {RoundToTwoDecimals(y5total)}</small>
                        </p>
                        <p className="card-text">
                            <small>
                                Capspace Remaining:{' '}
                                {RoundToTwoDecimals(y5remainder)}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="row mb-2">
            <div className="card p-2">
                <div className="row g-0">
                    <div className="col-3">
                        <img
                            src={teamLogo}
                            alt={isNFL ? team.TeamName : team.Team}
                            className="card-img-top imageSize object-fit"
                        />
                    </div>
                    <div className="col-9">
                        {isNFL ? <NFLCard /> : <NBACard />}
                    </div>
                </div>
            </div>
        </div>
    );
};
