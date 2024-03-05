import React from 'react';
import { baseUrl } from '../../Constants/logos';

const AttributeRow = ({ data, theme }) => {
    let attributeImage = baseUrl + '/attributes/' + data.Name + '.png';
    if (theme.toLowerCase() === 'dark') {
        attributeImage = `${baseUrl}/attributes/${data.Name}_Dark.svg`;
    }
    if (data.Name === 'Shotgun Rating' && theme.toLowerCase() === 'dark') {
        attributeImage = `${baseUrl}/attributes/${data.Name}_Dark.png`;
    }
    return (
        <div className="col-sm-3">
            <img src={attributeImage} className="attribute-icon" alt="" />
            <h6 className="title">{data.Name}</h6>
            <h6 className="subtitle">{data.Letter}</h6>
        </div>
    );
};

export default AttributeRow;
