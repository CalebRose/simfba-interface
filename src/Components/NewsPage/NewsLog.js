import React from 'react';

const NewsLog = (props) => {
    const { news, season, idx } = props;

    return (
        <div className="card mb-2 text-start">
            <div className="card-body">
                <h5 className="card-title">Log: {idx + 1}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    Season: {season} | Week: N/A | Type: {news.MessageType}
                </h6>
                <p className="card-text">{news.Message}</p>
            </div>
        </div>
    );
};

export default NewsLog;
