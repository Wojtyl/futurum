import React from "react";

import classes from "../Form.module.css";

const InputCheckbox = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>Status</label>
      <label
        className={`${classes.switch} ${classes.round}`}
        htmlFor={props.id}
      >
        <input
          type="checkbox"
          name={props.name}
          id={props.id}
          onChange={props.onChange}
          defaultChecked={props.status}
        />
        <span className={classes.slider}></span>
      </label>
    </React.Fragment>
  );
};

export default InputCheckbox;
