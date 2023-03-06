import React from "react";

const Input = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
      />
    </React.Fragment>
  );
};

export default Input;
