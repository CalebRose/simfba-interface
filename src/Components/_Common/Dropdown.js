import React from 'react';

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

export const TradeDropdown = ({ value, name, click, list, isUser }) => {
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
                    />
                ))}
            </ul>
        </div>
    );
};

export const TradeDropdownItem = ({ click, option, id, isUser }) => {
    const label =
        option.OptionType === 'Player'
            ? `${option.Position} ${option.FirstName} ${option.LastName}`
            : `${option.Season} Round ${option.Round}`;

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
