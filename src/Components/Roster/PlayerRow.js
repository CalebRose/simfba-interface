import React from 'react';

const PlayerRow = (props) => {
    const [showRow, setShowRow] = React.useState(false);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    const [overall, setOverall] = React.useState('');
    let ovr = props.data.Overall;
    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const handleResize = () => {
        setViewWidth(window.innerWidth);
    };

    React.useEffect(() => {
        if (ovr) {
            let letter = '';
            if (ovr >= 46) letter = 'A';
            else if (ovr > 36) letter = 'B';
            else if (ovr > 26) letter = 'C';
            else if (ovr > 16) letter = 'D';
            else letter = 'F';
            setOverall(letter);
        }
    }, [overall]);

    window.addEventListener('resize', handleResize);
    /* 
    Name, Position, Archtype, Ovr, Yr, Ht, Wt, St,
    HS/JC, Pot, Num
    
    */
    let data = props.data;
    const toggleModal = () => {
        data.Overall = overall;
        props.toggle();
        props.getData(data);
    };
    if (showRow || viewWidth >= 901) {
        return (
            <tr>
                <th
                    className="clickable"
                    onClick={toggleModal}
                    data-bs-toggle="modal"
                    data-bs-target="#playerModal"
                >
                    {props.data.First_Name + ' ' + props.data.Last_Name}
                </th>
                <td label="Archtype">{props.data.Archetype}</td>
                <td label="Position">{props.data.Position}</td>
                <td label="Overall">{overall}</td>
                <td label="Year">{props.data.Year}</td>
                <td label="Height">{props.data.Height}</td>
                <td label="Weight">{props.data.Weight}</td>
                <td label="State">{props.data.State}</td>
                <td label="School">{props.data.School}</td>
                <td label="Potential">{props.data.Potential}</td>
                <td label="Number">{props.data.JerseyNum}</td>
            </tr>
        );
    } else {
        return (
            <tr
                onTouchEnd={(e) => {
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                    setShowRow(!showRow);
                }}
            >
                <th className="clickable" onClick={toggleModal}>
                    {props.data.name}
                </th>
            </tr>
        );
    }
};

export default PlayerRow;
