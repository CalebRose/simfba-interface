import React from 'react';

const PlayerRow = (props) => {
    const [showRow, setShowRow] = React.useState(false);
    const [viewWidth, setViewWidth] = React.useState(window.innerWidth);
    let data = props.data;
    let school = props.school;

    const getOverall = (ovr) => {
        if (typeof ovr === 'string') return ovr;
        if (ovr >= 46) return 'A';
        else if (ovr > 36) return 'B';
        else if (ovr > 26) return 'C';
        else if (ovr > 16) return 'D';
        else return 'F';
    };

    const getYear = (data) => {
        const isRedshirt = data.IsRedshirt;
        const year = Number(data.Year);

        if (year === 1) {
            return 'Fr';
        } else if (year === 2 && isRedshirt) {
            return '(Fr)';
        } else if (year === 2 && !isRedshirt) {
            return 'So';
        } else if (year === 3 && isRedshirt) {
            return '(So)';
        } else if (year === 3 && !isRedshirt) {
            return 'Jr';
        } else if (year === 4 && isRedshirt) {
            return '(Jr)';
        } else if (year === 4 && !isRedshirt) {
            return 'Sr';
        } else if (year === 5 && isRedshirt) {
            return '(Sr)';
        } else {
            return 'Super Sr';
        }
    };

    let ovr = getOverall(data.Overall);
    const year = getYear(data);

    React.useEffect(() => {
        if (!viewWidth) {
            setViewWidth(window.innerWidth);
        }
    }, [viewWidth]);

    const handleResize = () => {
        setViewWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    /* 
    Name, Position, Archtype, Ovr, Yr, Ht, Wt, St,
    HS/JC, Pot, Num
    
    */

    const toggleModal = () => {
        data.Overall = ovr;
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
                    {props.data.FirstName + ' ' + props.data.LastName}
                </th>
                <td label="Archtype">{data.Archetype}</td>
                <td label="Position">{data.Position}</td>
                <td label="Overall">{ovr ? ovr : ''}</td>
                <td label="Year">{year ? year : ''}</td>
                <td label="Height">{data.Height}</td>
                <td label="Weight">{data.Weight}</td>
                <td label="State">{data.State}</td>
                <td label="School">{school}</td>
                <td label="Potential">{data.PotentialGrade}</td>
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
