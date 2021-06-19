import React from 'react';
import './FormInput.style.css';

const FormInput = ({ handleChange, label, ...otherProps }) => {
    let placeholder = (label) => {
        switch (label) {
            case 'Name':
                return 'John Smith';
            case 'Email':
                return 'test@gmail.com';
            case ('Username', 'Username or Email'):
                return 'Vegeta';
            default:
                return '';
        }
    };

    return (
        <div className="row" id={label}>
            <div className="field">
                {label ? (
                    <div className="mb-1 d-flex justify-content-start">
                        <label className="label text-start fs-5">{label}</label>
                    </div>
                ) : null}
                <div className="mb-1 input-group">
                    <input
                        onChange={handleChange}
                        className="form-control"
                        type="text"
                        placeholder={placeholder(label)}
                        {...otherProps}
                    ></input>
                </div>
            </div>
            {/* <div className="usernameinfo">
                <p className="help">This username is available</p>
       </div> */}
        </div>
    );
};

export default FormInput;
