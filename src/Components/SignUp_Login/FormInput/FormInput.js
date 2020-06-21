import React from "react";
import "./FormInput.style.css";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  let placeholder = label => {
    switch (label) {
      case "Name":
        return "John Smith";
      case "Email":
        return "test@gmail.com";
      case ("Username", "Username or Email"):
        return "Vegeta";
      default:
        return "";
    }
  };

  return (
    <div className="tile is-child" id={label}>
      <div className="field">
        {label ? <label className="label">{label}</label> : null}
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
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
