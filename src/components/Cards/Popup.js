import React from "react";

const Popup = (props) => {
  return (
    <div className={props.status}>
      <p>{props.message}</p>
    </div>
  );
};

export default Popup;
