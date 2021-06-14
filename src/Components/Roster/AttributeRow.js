import React from 'react';

const AttributeRow = (props) => {
    let attributeImage = '../img/attributes/' + props.data.Name + '.png';
    return (
        <div className="col-sm-3">
            <img src={attributeImage} className="attribute-icon" alt="" />
            <h6 className="title">{props.data.Name}</h6>
            <h6 className="subtitle">{props.data.Letter}</h6>
        </div>
    );
};

export default AttributeRow;
