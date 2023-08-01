import React from 'react';

export const NewsLog = ({ news, season, idx }) => {
    return (
        <div className="card mb-2 text-start">
            <div className="card-body">
                <h5 className="card-title">Log: {idx + 1}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    Season: {season} | Week: {news.Week} | Type:{' '}
                    {news.MessageType}
                </h6>
                <p className="card-text">{news.Message}</p>
            </div>
        </div>
    );
};

export const NewsLogSmall = ({ news, season }) => {
    return (
        <>
            <div className="card mb-2 text-start">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                        Season: {season} | Week: {news.Week} | Type:{' '}
                        {news.MessageType}
                    </h6>
                    <p className="card-text">{news.Message}</p>
                </div>
            </div>
        </>
    );
};
