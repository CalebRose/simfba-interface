import React from 'react';

export const NewsLog = ({ news, season, idx }) => {
    return (
        <div className="col-12 col-sm-4">
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

export const Notification = ({ noti, toggle, remove }) => {
    return (
        <>
            <div className="card mb-2 text-start">
                <div className="card-body">
                    <div className="row">
                        <div className="col-10">
                            <h6
                                className={`card-subtitle mb-2 ${
                                    !noti.IsRead ? 'text-danger' : 'text-muted'
                                }`}
                            >
                                Type: {noti.NotificationType}
                            </h6>
                            <p className="card-text">{noti.Message}</p>
                        </div>
                        <div className="col-2">
                            <div className="btn-group flex">
                                <button
                                    type="button"
                                    className="btn btn-sm border"
                                    onClick={() => toggle(noti)}
                                >
                                    <i className="bi bi-app-indicator" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm border"
                                    onClick={() => remove(noti)}
                                >
                                    <i className="bi bi-trash" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
