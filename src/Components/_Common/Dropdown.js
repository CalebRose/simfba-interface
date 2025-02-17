import React from 'react';
import BBATeamDropdownItem from '../BBA/Team/BBATeamDropdownItem';

export const DropdownItem = ({ click, value, id, name }) => {
    const handleChange = () => {
        return click(name, value);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className="dropdown-item"
                value={value}
                onClick={handleChange}
                id={id}
            >
                {value}
            </p>
        </li>
    );
};

export const DraftDropdownItem = ({ click, value, id, name }) => {
    const handleChange = () => {
        return click(name, value);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className="dropdown-item"
                value={value}
                onClick={handleChange}
                id={id}
            >
                {name}
            </p>
        </li>
    );
};

export const Dropdown = ({ value, click, id, list, name }) => {
    const label = !value || value.length === 0 ? 'Choose Type' : value;
    return (
        <div className="drop-start btn-dropdown-width-auto">
            <button
                name="team"
                className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <span>{label}</span>
            </button>
            <ul className="dropdown-menu dropdown-content">
                <DropdownItem value={label} click={click} id={id} name={name} />
                <hr className="dropdown-divider"></hr>
                {list.map((x, idx) => (
                    <DropdownItem
                        click={click}
                        value={x}
                        id={idx}
                        name={name}
                    />
                ))}
            </ul>
        </div>
    );
};

export const BBATeamDropdown = ({
    team,
    currentUser,
    selectTeam,
    list,
    isNBA
}) => {
    const handleUserClick = () => {
        return selectTeam(team);
    };
    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {team && team.Team}
            </button>
            <ul
                className="dropdown-menu dropdown-content"
                aria-labelledby="dropdownMenuButton1"
            >
                <li>
                    <p className="dropdown-item" onClick={handleUserClick}>
                        {isNBA ? currentUser.NBATeam : currentUser.NFLTeam}
                    </p>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                {list &&
                    list.map((x) => (
                        <BBATeamDropdownItem
                            key={x.ID}
                            selectTeam={selectTeam}
                            team={x}
                        />
                    ))}
            </ul>
        </div>
    );
};

export const NFLTeamDropdown = ({
    team,
    currentUser,
    selectTeam,
    list,
    isNBA
}) => {
    const handleUserClick = () => {
        return selectTeam(team);
    };
    return (
        <div className="dropdown">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {team && team.Team}
            </button>
            <ul
                className="dropdown-menu dropdown-content"
                aria-labelledby="dropdownMenuButton1"
            >
                <li>
                    <p className="dropdown-item" onClick={handleUserClick}>
                        {isNBA ? currentUser.NBATeam : currentUser.NFLTeam}
                    </p>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                {list &&
                    list.map((x) => (
                        <NFLTeamDropdownItem
                            key={x.ID}
                            selectTeam={selectTeam}
                            team={x}
                        />
                    ))}
            </ul>
        </div>
    );
};

export const TradeDropdown = ({ value, name, click, list, isUser, isNFL }) => {
    const label = !value || value.length === 0 ? 'Choose Option' : value;
    return (
        <div className="drop-start btn-dropdown-width-auto">
            <button
                name="team"
                className="btn btn-secondary dropdown-toggle btn-dropdown-width-auto"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <span>{label}</span>
            </button>
            <ul className="dropdown-menu dropdown-content">
                {list.map((x, idx) => (
                    <TradeDropdownItem
                        click={click}
                        option={x}
                        id={idx}
                        name={name}
                        isUser={isUser}
                        isNFL={isNFL}
                    />
                ))}
            </ul>
        </div>
    );
};

export const TradeDropdownItem = ({ click, option, id, isUser, isNFL }) => {
    const label =
        option.OptionType === 'Player'
            ? `${option.Position} ${option.FirstName} ${option.LastName}`
            : `${option.Season} Round ${option.DraftRound} from ${option.OriginalTeam}`;

    const handleChange = () => {
        return click(option, isUser);
    };

    return (
        <li className="clickable" style={{ textAlign: 'left' }}>
            <p
                className="dropdown-item"
                value={label}
                onClick={handleChange}
                id={id}
            >
                {label}
            </p>
        </li>
    );
};

const NFLTeamDropdownItem = (props) => {
    let { team } = props;

    const handleChange = (event) => {
        return props.selectTeam(team);
    };
    return (
        <li>
            <p className="dropdown-item" value={team} onClick={handleChange}>
                {team.TeamName}
            </p>
        </li>
    );
};
