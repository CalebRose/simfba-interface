import React from 'react';

const ServiceMessageContainer = (props) => {
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="position-relative"
        >
            <div className="toast-container position-absolute bottom-0 end-0 p-3">
                {props.children}
            </div>
        </div>
    );
};
