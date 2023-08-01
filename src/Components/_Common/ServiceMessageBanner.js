import React from 'react';
import { SavingMessage } from '../../Constants/SystemMessages';

export const ServiceMessageBanner = ({ serMessage, errMessage }) => (
    <>
        {(serMessage.length > 0 || errMessage.length > 0) && (
            <div className="service-banner position-absolute top-0 end-0 p-3">
                {serMessage.length > 0 && serMessage !== SavingMessage && (
                    <div className="alert alert-success">{serMessage}</div>
                )}
                {serMessage.length > 0 && serMessage === SavingMessage && (
                    <div className="alert alert-secondary">{serMessage}</div>
                )}
                {errMessage.length > 0 && (
                    <div className="alert alert-danger">{errMessage}</div>
                )}
            </div>
        )}
    </>
);

export const ShortMessage = ({ serMessage, errMessage }) => (
    <div className="col-8">
        {(serMessage.length > 0 || errMessage.length > 0) && (
            <div className="p-3">
                {errMessage.length === 0 && serMessage !== SavingMessage && (
                    <div className="alert alert-success">{serMessage}</div>
                )}
                {serMessage.length === 0 && serMessage === SavingMessage && (
                    <div className="alert alert-secondary">{serMessage}</div>
                )}
                {errMessage.length > 0 && (
                    <div className="alert alert-danger">{errMessage}</div>
                )}
            </div>
        )}
    </div>
);
