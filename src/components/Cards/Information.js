import React from "react";

import classes from "./CampaignCard.module.css";

const Information = (props) => {
  return (
    <div className={classes["campaign-card_div"]}>
      <h1 className={classes["campaign-card_h1"]}>{props.title}</h1>
      <p className={classes["campaign-card_desc"]}>{props.description}</p>
    </div>
  );
};

export default Information;
