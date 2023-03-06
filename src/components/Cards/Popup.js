import React from "react";
import ReactDOM from "react-dom";
import Button from "../Buttons/Button";

import classes from "./Popup.module.css";

const Popup = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div
          className={`${classes["popup-container"]} ${
            props.status === "error" ? classes.error : classes.success
          }`}
        >
          <div
            className={
              props.status === "error"
                ? classes["error-block"]
                : classes["success-block"]
            }
          ></div>
          <div className={classes["popup-inside"]}>
            <p className={classes["popup-message"]}>{props.message}</p>
            <Button
              onClick={props.closeError}
              className={
                props.status === "error"
                  ? classes["error-button"]
                  : classes["success-button"]
              }
              type="button"
            >
              Okey
            </Button>
          </div>
        </div>,
        document.getElementById("popup")
      )}
    </React.Fragment>
  );
};

export default Popup;
